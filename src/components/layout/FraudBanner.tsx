'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function FraudBanner() {
  const t = useTranslations('header');

  return (
    <div
      className="elementor-element elementor-element-5ce6159c e-flex e-con-boxed e-con e-parent"
      data-id="5ce6159c"
      data-element_type="container"
      data-e-type="container"
      data-settings='{"background_background":"classic"}'
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-1c08c41d e-flex e-con-boxed e-con e-child"
          data-id="1c08c41d"
          data-element_type="container"
          data-e-type="container"
        >
          <div className="e-con-inner">
            <div
              className="elementor-element elementor-element-14bbd0c2 elementor-position-inline-start elementor-mobile-position-inline-start elementor-widget__width-initial elementor-widget-mobile__width-initial elementor-view-default elementor-widget elementor-widget-icon-box"
              data-id="14bbd0c2"
              data-element_type="widget"
              data-e-type="widget"
              data-widget_type="icon-box.default"
            >
              <div className="elementor-widget-container">
                <div className="elementor-icon-box-wrapper">
                  <div className="elementor-icon-box-icon">
                    <span className="elementor-icon">
                      <svg
                        aria-hidden="true"
                        className="e-font-icon-svg e-fas-exclamation-circle"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
                      </svg>
                    </span>
                  </div>
                  <div className="elementor-icon-box-content">
                    <p className="elementor-icon-box-description">
                      {t('fraudWarning')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
