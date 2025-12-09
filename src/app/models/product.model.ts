export interface JourneyStage {
  date: string;
  notes: string;
  location?: string;
}

export interface ProductJourney {
  planting?: JourneyStage;
  growing?: JourneyStage;
  harvest?: JourneyStage;
  processing?: JourneyStage;
  packaging?: JourneyStage;
  distribution?: JourneyStage;
}

export interface Product {
  id: string;
  name: string;
  farmName: string;
  farmerName: string;
  farmerEmail: string;
  farmerPhone: string;
  category: string;
  seedOrigin: string;
  plantingDate: string;
  harvestDate: string;
  certifications: string[];
  location: string;
  description: string;
  imageUrl?: string;
  transportMethod?: string;
  storeLocation?: string;
  qrCode?: string;
  scanCount: number;
  createdAt: string;
  journey?: ProductJourney;
}

export interface JourneyStep {
  step: string;
  date: string;
  location: string;
  description: string;
  icon: string;
}
