/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconContact: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M294.03125 794.3046875c0-10.546875-7.91015625-26.27929688-26.45507813-26.27929688h-79.27734374c-15.8203125 0-26.45507813 14.50195313-26.45507813 26.27929688 0 11.86523438 6.59179688 26.27929688 26.45507813 26.27929688H267.6640625c19.77539063 0 26.3671875-15.73242188 26.3671875-26.27929688zM188.38671875 268.45507812H267.6640625c19.77539063 0 26.45507813-15.8203125 26.45507813-26.27929687 0-10.546875-7.91015625-26.27929688-26.45507813-26.27929687h-79.27734375c-15.8203125 0-26.45507813 14.50195313-26.45507813 26.27929687 0.08789063 11.86523438 6.6796875 26.27929688 26.45507813 26.27929688z"
        fill={getIconColor(color, 0, '#2c2c2c')}
      />
      <Path
        d="M822.34179688 136.97070312H267.6640625c-19.77539063 0-39.63867188 19.6875-39.63867188 39.46289063v13.18359375H267.6640625c30.41015625 0 52.82226563 21.00585938 52.82226563 52.55859375s-22.41210938 52.55859375-52.82226563 52.55859375h-39.63867188v78.83789063H267.6640625c30.41015625 0 52.82226563 21.00585938 52.82226563 52.55859374s-22.41210938 52.55859375-52.82226563 52.55859375h-39.63867188V557.703125H267.6640625c30.41015625 0 52.82226563 21.00585938 52.82226563 52.55859375s-22.41210938 52.55859375-52.82226563 52.55859375h-39.63867188v78.83789063H267.6640625c30.41015625 0 52.82226563 21.00585938 52.82226563 52.55859374s-22.41210938 52.55859375-52.82226563 52.55859375h-39.63867188v13.18359375c0 19.6875 19.77539063 39.46289063 39.63867188 39.46289063h554.67773438c19.77539063 0 39.63867188-19.6875 39.63867187-39.46289063V176.43359375c0-19.6875-19.77539063-39.46289063-39.63867187-39.46289063z m-75.23437501 532.44140625c-9.22851563 19.6875-40.95703125 59.15039063-72.59765625 59.15039063-34.36523438 0-118.91601563-45.96679688-190.19531249-143.26171875-66.00585938-90.703125-97.734375-157.76367188-97.73437501-201.18164063 0-35.5078125 23.81835938-51.24023438 35.68359375-60.46875l3.95507813-2.63671875c14.50195313-10.546875 35.68359375-13.18359375 43.59375-13.18359375 14.50195313 0 21.09375 9.22851563 25.13671875 15.73242188 2.63671875 6.59179688 29.09179688 64.42382813 31.72851562 71.015625 3.95507813 10.546875 2.63671875 27.59765625-9.22851562 36.82617187l-2.63671875 1.31835938c-6.59179688 3.95507813-18.45703125 13.18359375-19.77539063 22.32421875-1.31835938 5.2734375 1.31835938 10.546875 5.2734375 15.8203125 19.77539063 27.59765625 84.55078125 110.390625 96.41601563 120.9375 9.22851563 9.22851563 21.09375 10.546875 29.09179687 2.63671875 7.91015625-6.59179688 11.86523438-11.86523438 11.86523438-11.86523438l1.31835937-1.31835937c1.31835938 0 6.59179688-5.2734375 17.13867188-5.2734375 7.91015625 0 14.50195313 2.63671875 22.41210937 7.91015625 19.77539063 13.18359375 63.36914063 43.41796875 63.36914063 43.41796875h1.31835937c5.18554688 9.22851563 13.09570313 23.73046875 3.8671875 42.09960937z"
        fill={getIconColor(color, 1, '#2c2c2c')}
      />
      <Path
        d="M188.38671875 636.54101563H267.6640625c19.77539063 0 26.45507813-15.8203125 26.45507813-26.27929688 0-10.546875-7.91015625-26.27929688-26.45507813-26.27929688h-79.27734375c-15.8203125 0-26.45507813 14.50195313-26.45507813 26.27929688 0.08789063 11.86523438 6.6796875 26.27929688 26.45507813 26.27929687zM188.38671875 452.49804687H267.6640625c19.77539063 0 26.45507813-15.73242188 26.45507813-26.27929687s-7.91015625-26.27929688-26.45507813-26.27929688h-79.27734375c-15.8203125 0-26.45507813 14.50195313-26.45507813 26.27929688 0.08789063 11.86523438 6.6796875 26.27929688 26.45507813 26.27929687z"
        fill={getIconColor(color, 2, '#2c2c2c')}
      />
    </Svg>
  );
};

IconContact.defaultProps = {
  size: 18,
};

IconContact = React.memo ? React.memo(IconContact) : IconContact;

export default IconContact;