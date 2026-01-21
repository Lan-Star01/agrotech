import { Injectable, NgZone } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/browser';
import { BehaviorSubject } from 'rxjs';

export interface ScanResult {
  success: boolean;
  data?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  private codeReader: BrowserQRCodeReader | null = null;
  private videoStream: MediaStream | null = null;
  private isScanning = false;
  private controls: any = null;

  private scanResultSubject = new BehaviorSubject<ScanResult | null>(null);
  scanResult$ = this.scanResultSubject.asObservable();

  constructor(private ngZone: NgZone) {}

  private initCodeReader(): BrowserQRCodeReader {
    if (!this.codeReader) {
      this.codeReader = new BrowserQRCodeReader();
    }
    return this.codeReader;
  }

  async startScanning(videoElement: HTMLVideoElement): Promise<void> {
    if (this.isScanning) {
      return;
    }

    try {
      this.isScanning = true;
      const reader = this.initCodeReader();

      // გამოვიყენოთ @zxing/browser-ის decodeFromVideoDevice
      this.controls = await reader.decodeFromVideoDevice(
        undefined, // undefined = default camera (back camera on mobile)
        videoElement,
        (result, error) => {
          this.ngZone.run(() => {
            if (result) {
              this.scanResultSubject.next({
                success: true,
                data: result.getText()
              });
              this.stopScanning();
            }
            // შეცდომები იგნორირდება სანამ QR კოდს არ იპოვის
          });
        }
      );

    } catch (error: any) {
      this.isScanning = false;
      let errorMessage = 'კამერის გახსნა ვერ მოხერხდა';

      if (error.name === 'NotAllowedError') {
        errorMessage = 'კამერის წვდომა უარყოფილია. გთხოვთ დართოთ ნებართვა ბრაუზერის პარამეტრებში.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'კამერა ვერ მოიძებნა. გთხოვთ დარწმუნდით, რომ თქვენს მოწყობილობას აქვს კამერა.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'კამერა გამოიყენება სხვა აპლიკაციის მიერ.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'კამერის პარამეტრები არ არის მხარდაჭერილი.';
      }

      this.scanResultSubject.next({
        success: false,
        error: errorMessage
      });
    }
  }

  stopScanning(): void {
    this.isScanning = false;

    if (this.controls) {
      this.controls.stop();
      this.controls = null;
    }

    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
  }

  resetResult(): void {
    this.scanResultSubject.next(null);
  }

  get scanning(): boolean {
    return this.isScanning;
  }
}
