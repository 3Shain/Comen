import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';

export default (
  config: webpack.Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions
) => {
  config.plugins?.push(
    new webpack.DefinePlugin({
      COMEN_ENVIRONMENT: `"${process.env.COMEN_ENVIRONMENT ?? ''}"`,
    })
  );
  config.resolve['fallback'] = {
    crypto: false,
  };
  // console.log();
  return config;
};
