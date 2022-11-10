export enum BrainPlanes {
    AXIAL = 'AXIAL',
    CORONAL = 'CORONAL',
    SAGITTAL = 'SAGITTAL'
}

export enum AlzheimerGroupsIndex {
   AD = 0,
   CN = 1,
   MCI = 2,
}

export enum AlzheimerGroupsCode {
   CN = 'Cognitivamente normal',
   MCI = 'Deterioro cognitivo leve',
   AD = 'Alzheimer',
}

export class Prediction {
  /**
   * Alzheimer group result
   */
  groupCode: AlzheimerGroupsCode;

  /**
   * Alzheimer groups score
   */
  score: number[];

  constructor(groupCode: AlzheimerGroupsCode, score: []) {
    this.groupCode = groupCode;
    this.score = score;
  }
}

export class ImgClassification {
  /**
   * Brain plane
   */
  plane: BrainPlanes;
  /**
   * Image
   */
  img: string;
  /**
   * Image prediction
   */
  prediction: Prediction;

  constructor(plane: BrainPlanes, img: string, prediction: Prediction) {
    this.plane = plane;
    this.img = img;
    this.prediction = prediction;
  }
}
