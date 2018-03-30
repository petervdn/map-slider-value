export default class SliderValueMapper {
  private sliderMin: number;
  private sliderMax: number;
  private valueMin: number;
  private valueMax: number;
  private minLog: number;
  private maxLog: number;
  private scaleLog: number;
  private isExp: boolean;

  constructor(valueMin: number, valueMax: number, isExp = false, sliderMin = 0, sliderMax = 100) {
    if (valueMin === 0 && isExp) {
      throw new Error(
        'Cannot set valueMin to 0 when using exponential scale (use something small like 0.00001)',
      );
    }
    this.valueMin = valueMin;
    this.valueMax = valueMax;
    this.sliderMin = sliderMin;
    this.sliderMax = sliderMax;
    this.isExp = isExp;

    if (isExp) {
      this.minLog = Math.log(this.valueMin);
      this.maxLog = Math.log(this.valueMax);
      this.scaleLog = (this.maxLog - this.minLog) / (this.sliderMax - this.sliderMin);
    }
  }

  public sliderValueToValue(sliderValue): number {
    if (this.isExp) {
      return Math.exp((sliderValue - this.sliderMin) * this.scaleLog + this.minLog);
    }
    const sliderFactor = (sliderValue - this.sliderMin) / (this.sliderMax - this.sliderMin);
    return this.valueMin + sliderFactor * (this.valueMax - this.valueMin);
  }

  public valueToSliderValue(value): number {
    if (this.isExp) {
      return this.sliderMin + (Math.log(value) - this.minLog) / this.scaleLog;
    }

    const factor = (value - this.valueMin) / (this.valueMax - this.valueMin);
    return this.sliderMin + factor * (this.sliderMax - this.sliderMin);
  }
}
