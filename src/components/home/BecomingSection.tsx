'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function BecomingSection() {
  const t = useTranslations('becoming');
  const tCommon = useTranslations('common');

  return (
    <div
      className="elementor-element elementor-element-5c38dfac e-flex e-con-boxed e-con e-parent"
      data-id="5c38dfac"
      data-element_type="container"
      data-settings='{"background_background":"classic"}'
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-293db66 e-con-full e-flex e-con e-child"
          data-id="293db66"
          data-element_type="container"
          data-e-type="container"
        >
          <div
            className="elementor-element elementor-element-2ea2cf96 e-con-full e-flex e-con e-child"
            data-id="2ea2cf96"
            data-element_type="container"
            data-e-type="container"
          >
            <div
              className="elementor-element elementor-element-446905a7 elementor-widget__width-initial animated-slow elementor-widget elementor-widget-heading"
              data-id="446905a7"
              data-element_type="widget"
              data-e-type="widget"
              data-settings='{"_animation":"fadeInLeft"}'
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <h3 className="elementor-heading-title elementor-size-default">
                  {t('heading')}
                </h3>
              </div>
            </div>

            <div
              className="elementor-element elementor-element-1ce6695d e-con-full e-flex e-con e-child"
              data-id="1ce6695d"
              data-element_type="container"
              data-e-type="container"
            >
              <div
                className="elementor-element elementor-element-2596d909 elementor-widget__width-initial elementor-widget elementor-widget-text-editor"
                data-id="2596d909"
                data-element_type="widget"
                data-e-type="widget"
                data-widget_type="text-editor.default"
              >
                <div className="elementor-widget-container">
                  <p>{t('paragraph1')}</p>
                  <p>{t('paragraph2')}</p>
                  <p>{t('paragraph3')}</p>
                </div>
              </div>

              <div
                className="elementor-element elementor-element-e1ead62 elementor-align-right animated-slow elementor-widget elementor-widget-button"
                data-id="e1ead62"
                data-element_type="widget"
                data-e-type="widget"
                data-settings='{"_animation":"fadeInDown"}'
                data-widget_type="button.default"
              >
                <div className="elementor-widget-container">
                  <div className="elementor-button-wrapper">
                    <Link
                      className="elementor-button elementor-button-link elementor-size-sm elementor-animation-float"
                      href="/about-us"
                    >
                      <span className="elementor-button-content-wrapper">
                        <span className="elementor-button-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Layer_1"
                            viewBox="0 0 88.4 89.1"
                            style={{ width: '14px', height: '14px' }}
                          >
                            <polygon
                              fill="#FFFFFF"
                              points="81.3 77.5 72.3 77.5 72.3 15.4 10.1 15.4 10.1 6.4 81.3 6.4 81.3 77.5"
                            />
                            <rect
                              fill="#FFFFFF"
                              x="-3.7"
                              y="39.7"
                              width="94.3"
                              height="9"
                              transform="translate(-18.5 43.7) rotate(-45)"
                            />
                          </svg>
                        </span>
                        <span className="elementor-button-text">{tCommon('learnMore')}</span>
                      </span>
                    </Link>
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
