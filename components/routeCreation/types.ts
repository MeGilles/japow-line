export type formLabelsType = {
  name: string;
  title: string;
  placeAndTime: string;
  mountains: string;
  recommendedMonths: string;
  routeType: string;
  altitudeType: string;
  numericalData: string;
  elevationDifference: string;
  maxAltitude: string;
  minAltitude: string;
  totalDistance: string;
  elevationDistance: string;
  decentDistance: string;
  startAndGoal: string;
  startPoint: string;
  goalPoint: string;
  description: string;
  attachments: string;
  map: string;
  photos: string;
  elevationChart: string;
  preview: string;
};

export type formDataType = {
  titles: string[];
  mountains: string[];
  months: string[];
  routeTypes: string[];
  altitudeZones: string[];
  elevationDifference: number;
  maxAltitude: number;
  minAltitude: number;
  totalDistance: number;
  elevationDistance: number;
  decentDistance: number;
  startPoint: string[];
  goalPoint: string[];
  description: string[];
  map: string;
  photos: attachmentType[];
  elevationChart: attachmentType;
};

export type attachmentType = {
  src: string;
};
