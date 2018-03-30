import {expect} from 'chai';
import SliderValueMapper from "../src/";

const expErrorMargin = 0.0000000001;

describe('Example', () => {
  it('should not accept invalid values in constructor', () => {
    expect(() => {
      new SliderValueMapper(100, 50);
    }).to.throw('valueMax should be greater than valueMin');
    expect(() => {
      new SliderValueMapper(0, 50, false, 100, 50);
    }).to.throw('sliderMax should be greater than sliderMin');
    expect(() => {
      new SliderValueMapper(0, 50, true);
    }).to.throw('Cannot set valueMin to 0 when using exponential scale');
  });

  it('should map linear values', () => {
    const mapper = new SliderValueMapper(1000, 2000);
    expect(mapper.map(50)).to.equal(1500);
    expect(mapper.map(0)).to.equal(1000);
    expect(mapper.map(100)).to.equal(2000);
    expect(mapper.reverseMap(1500)).to.equal(50);
  });

  it('should map linear values with a different slider-range', () => {
    const mapper = new SliderValueMapper(1000, 2000, false, 0, 50);
    expect(mapper.map(25)).to.equal(1500);
    expect(mapper.reverseMap(1500)).to.equal(25);
  });

  it('should map exponential values', () => {
    const mapper = new SliderValueMapper(1000, 2000, true);
    const resultFor0 = mapper.map(0);
    const resultFor100 = mapper.map(100);
    const reverseFor2000 = mapper.reverseMap(2000);
    const reverseFor1000 = mapper.reverseMap(1000);
    // results have a tiny rounding error
    expect(Math.abs(resultFor0 - 1000)).to.be.below(expErrorMargin);
    expect(Math.abs(resultFor100 - 2000)).to.be.below(expErrorMargin);
    expect(Math.abs(reverseFor2000 - 100)).to.be.below(expErrorMargin);
    expect(Math.abs(reverseFor1000 - 0)).to.be.below(expErrorMargin);
  });

  it('should map exponential values with a different slider-range', () => {
    const mapper = new SliderValueMapper(1000, 2000, true, 100, 200);
    const resultFor100 = mapper.map(100);
    const resultFor200 = mapper.map(200);
    // results have a tiny rounding error
    expect(Math.abs(resultFor100 - 1000)).to.be.below(expErrorMargin);
    expect(Math.abs(resultFor200 - 2000)).to.be.below(expErrorMargin);
  });
});
