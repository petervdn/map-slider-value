# map-slider-value

Maps values from a linear range to another range, which can be either linear or exponential. Most likely usecase is in combination with a slider, like `<input type="range">`.

## install
```sh
npm install map-slider-value
```

## usage

First, create an instance of the mapper and supply the minimum and maximum output. This setup assumes that the range of the slider is from 0 to 100 (which is the default range for `<input type="range">`).   
```typescript
import SliderValueMapper from 'map-slider-value';

const mapper = new SliderValueMapper(1000, 2000);
```

After that there are two methods you can call to convert values back and forth.
```typescript
// if your slider is value 50
mapper.map(50); // returns 1500

// if you want to set your slider on the correct position from a given value
mapper.reverseMap(1500); // returns 50
```

While the example above maps everything in a linear fashion, setting the 3rd parameter to `true` when creating the mapper results in an exponential output. This is for example useful when controlling an audio frequency.

```typescript
const exponentialMapper = new SliderValueMapper(20, 20000, true);
```

__Setting the minimum value to 0 when using exponential mapping will throw an error, since you cannot exponentially grow from 0. You can circumvent this by using a very small minimum value (0.00001)__

## non-default slider range
If the slider you're using doesn't go from 0 to 100 you can declare its minimum and maximum as the 4th and 5th parameter: 

```typescript
new SliderValueMapper(1000, 2000, false, 10, 50); // linear
new SliderValueMapper(1000, 2000, true, 10, 50);  // exp 
``` 
