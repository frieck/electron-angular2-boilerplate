import {Injectable, Inject} from '@angular/core';
import {BaThemeConfigProvider} from './theme.configProvider';
import {colorHelper} from './theme.constants';

@Injectable()
export class BaThemeConfig {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  public config() {
    this._baConfig.changeTheme({name: 'clean'});

     let colorScheme = {
       primary: '#C3C3C3',
       info: '#2dacd1',
       success: '#90b900',
       warning: '#dfb81c',
       danger: '#e85656',
       defaultText: '#000000',
     };
     this._baConfig.changeColors({
       default: '#4e4e55',
       defaultText: colorScheme.defaultText,
       border: '#dddddd',
       borderDark: '#aaaaaa',
    
       primary: colorScheme.primary,
       info: colorScheme.info,
       success: colorScheme.success,
       warning: colorScheme.warning,
       danger: colorScheme.danger,
    
       primaryLight: colorHelper.tint(colorScheme.primary, 30),
       infoLight: colorHelper.tint(colorScheme.info, 30),
       successLight: colorHelper.tint(colorScheme.success, 30),
       warningLight: colorHelper.tint(colorScheme.warning, 30),
       dangerLight: colorHelper.tint(colorScheme.danger, 30),
    
       primaryDark: colorHelper.shade(colorScheme.primary, 15),
       infoDark: colorHelper.shade(colorScheme.info, 15),
       successDark: colorHelper.shade(colorScheme.success, 15),
       warningDark: colorHelper.shade(colorScheme.warning, 15),
       dangerDark: colorHelper.shade(colorScheme.danger, 15),
    
       dashboard: {
         blueStone: '#BDC4C5',
         surfieGreen: '#989FA1',
         silverTree: '#797C7C',
         gossip: '#5E5F5E',
         white: '#363534',
       },
       
       custom: {
        dashboardLineChart: colorScheme.defaultText,
        dashboardPieChart: colorHelper.hexToRgbA(colorScheme.defaultText, 0.8)
      }
     });
  }
}
