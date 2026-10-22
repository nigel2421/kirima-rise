'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getAllPlots, Plot } from '@/lib/plots';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tPlots = useTranslations('plots');
  const locale = useLocale();

  // Plots Accordion state
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'Block 220' | 'Block 179'>('ALL');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Submission / Modal state
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  } | null>(null);

  const allPlots = useMemo(() => getAllPlots(), []);

  // Filtered plots
  const filteredPlots = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return allPlots.filter((item) => {
      const matchesCategory =
        activeCategory === 'ALL' ||
        (activeCategory === 'Block 220' && item.block.includes('220')) ||
        (activeCategory === 'Block 179' && item.block.includes('179'));

      const matchesSearch =
        !query ||
        item.parcelNo.toLowerCase().includes(query) ||
        item.fullCode.toLowerCase().includes(query) ||
        item.block.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [allPlots, searchTerm, activeCategory]);

  // Handle Hash on Mount (#plots-batch-section or #next)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#plots-batch-section') {
        setIsOpen(true);
        setTimeout(() => {
          const el = document.getElementById('plots-batch-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (hash === '#next') {
        setTimeout(() => {
          const el = document.getElementById('next');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  const handleSelectPlot = (plot: Plot) => {
    setSelectedPlot(plot);

    const isSw = locale === 'sw';
    const sub = isSw
      ? `Uchunguzi: Kiwanja #${plot.parcelNo} (${plot.fullCode}) - Awamu ya 1`
      : `Enquiry: Parcel #${plot.parcelNo} (${plot.fullCode}) - 1st Batch`;

    const msg = isSw
      ? `Hujambo timu ya Kirima Rise,\n\nNinawasiliana nanyi kuhusu Kiwanja #${plot.parcelNo} (${plot.fullCode}) kilichoorodheshwa chini ya utoaji wa kurasimisha wa Awamu ya Kwanza.\n\nTafadhali nifahamisheni kuhusu hali ya uthibitishaji, ratiba ya uchakataji wa hatimiliki, na nyaraka zinazohitajika kwa kiwanja hiki.\n\nAsanteni.`
      : `Hello Kirima Rise team,\n\nI am contacting you regarding Parcel #${plot.parcelNo} (${plot.fullCode}) listed under the 1st Batch regularisation release.\n\nPlease advise on the verification status, title processing schedule, and required documentation for this parcel.\n\nThank you.`;

    setSubject(sub);
    setMessage(msg);

    // Scroll to form smoothly
    setTimeout(() => {
      const form = document.getElementById('kirima-enquiry-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const nameField = document.getElementById('kr-name-input');
        if (nameField) nameField.focus();
      }
    }, 100);
  };

  const handleClearSelectedPlot = () => {
    setSelectedPlot(null);
    setSubject('');
    setMessage('');
  };

  const handleEnquireNotFound = () => {
    const isSw = locale === 'sw';
    setSubject(
      isSw
        ? `Uchunguzi kuhusu Kiwanja #${searchTerm || 'Kisichoorodheshwa'} (Uhakiki wa Hali)`
        : `Enquiry regarding Parcel #${searchTerm || 'Unlisted'} (Status Check)`
    );
    const form = document.getElementById('kirima-enquiry-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const subField = document.getElementById('kr-subject-input');
      if (subField) subField.focus();
    }
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject) return;

    setIsLoading(true);
    // Simulate brief network submission
    await new Promise((resolve) => setTimeout(resolve, 850));
    setIsLoading(false);

    setSubmittedData({
      name,
      email,
      phone,
      subject,
      message,
    });
    setShowModal(true);
  };

  const handleWhatsAppSubmit = () => {
    const textLines = [
      locale === 'sw' ? '*UCHUNGUZI WA KIWANJA - KIRIMA RISE*' : '*KIRIMA RISE OFFICIAL ENQUIRY*',
      '',
      `*Name:* ${name || 'N/A'}`,
      `*Email:* ${email || 'N/A'}`,
      phone ? `*Phone:* ${phone}` : '',
      `*Subject:* ${subject || (selectedPlot ? `Parcel #${selectedPlot.parcelNo}` : 'General Inquiry')}`,
      '',
      message || (locale === 'sw' ? 'Ningependa maelezo zaidi kuhusu viwanja vya Njiru.' : 'I would like to inquire about Njiru plots regularisation and processing.'),
    ].filter(Boolean);

    const text = encodeURIComponent(textLines.join('\n'));
    const url = `https://wa.me/254716953637?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setSelectedPlot(null);
  };

  return (
    <div className="contact-page-wrapper">
      {/* 1. HERO SECTION (100% Matching sample-page/index.html) */}
      <div className="kr-inner-hero">
        <div className="kr-inner-hero-inner">
          <div className="kr-inner-hero-content">
            <div className="kr-hero-left">
              <h1 className="kr-page-title-heading">{t('heroTitle')}</h1>
              <p className="kr-page-subtitle-text">{t('heroSubtitle')}</p>
              <div className="kr-hero-divider" />
              <a href="#next" className="kr-explore-btn">
                <svg aria-hidden="true" viewBox="0 0 256 512">
                  <path d="M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z" />
                </svg>
                <span>{t('exploreBtn')}</span>
              </a>
            </div>
            <div className="kr-hero-image-wrap">
              <img
                loading="eager"
                decoding="async"
                width={1024}
                height={1024}
                src="/wp-content/uploads/2026/08/contact-office.jpg"
                alt="Kirima Rise Contact Office"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div id="next" className="kr-contact-content-section">
        {/* ======================================================== */}
        {/* 1ST BATCH 200 PLOTS INTERACTIVE ACCORDION               */}
        {/* ======================================================== */}
        <section id="plots-batch-section" style={{ width: '100%', marginBottom: '35px' }}>
          <div className={`kr-accordion-card ${isOpen ? 'open' : ''}`} id="krAccordionCard">
            {/* Accordion Trigger Header */}
            <div
              className="kr-accordion-header"
              id="krAccordionToggle"
              role="button"
              aria-expanded={isOpen}
              tabIndex={0}
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }
              }}
            >
              <div className="kr-header-title-wrap">
                <div className="kr-header-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V18z" />
                  </svg>
                </div>
                <div>
                  <h3 className="kr-header-title">{tPlots('accordionTitle')}</h3>
                  <p className="kr-header-subtitle">{tPlots('accordionSubtitle')}</p>
                </div>
              </div>
              <div className="kr-header-right">
                <span className="kr-expand-badge">{tPlots('tapToExpand')}</span>
                <span className="kr-batch-badge">{tPlots('batchVerified')}</span>
                <div className="kr-chevron">
                  <svg viewBox="0 0 24 24">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Accordion Body */}
            {isOpen && (
              <div className="kr-accordion-body" id="krAccordionBody">
                {/* Toolbar */}
                <div className="kr-toolbar">
                  <div className="kr-search-box">
                    <div className="kr-search-input-wrap">
                      <svg className="kr-search-icon" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </svg>
                      <input
                        type="text"
                        id="krPlotSearch"
                        className="kr-search-input"
                        placeholder={tPlots('searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoComplete="off"
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          id="krSearchClear"
                          className="kr-search-clear"
                          title="Clear search"
                          onClick={() => setSearchTerm('')}
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="kr-filter-pills">
                    <button
                      type="button"
                      className={`kr-pill-btn ${activeCategory === 'ALL' ? 'active' : ''}`}
                      onClick={() => setActiveCategory('ALL')}
                    >
                      {tPlots('filterAll')}
                    </button>
                    <button
                      type="button"
                      className={`kr-pill-btn ${activeCategory === 'Block 220' ? 'active' : ''}`}
                      onClick={() => setActiveCategory('Block 220')}
                    >
                      {tPlots('filterBlock220')}
                    </button>
                    <button
                      type="button"
                      className={`kr-pill-btn ${activeCategory === 'Block 179' ? 'active' : ''}`}
                      onClick={() => setActiveCategory('Block 179')}
                    >
                      {tPlots('filterBlock179')}
                    </button>
                  </div>
                </div>

                {/* Match Toast */}
                {selectedPlot && (
                  <div id="krMatchToast" className="kr-match-toast show" style={{ display: 'flex' }}>
                    <span id="krMatchToastText">
                      <strong>{selectedPlot.fullCode}</strong> ({tPlots('plotSelectedToast')})
                    </span>
                    <a
                      id="krMatchToastLink"
                      onClick={() => {
                        const form = document.getElementById('kirima-enquiry-form');
                        if (form) form.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {tPlots('autoFillLink')}
                    </a>
                  </div>
                )}

                {/* Count Meta Row */}
                <div className="kr-meta-row">
                  <div>
                    {tPlots('showing')}{' '}
                    <span id="krVisibleCount" className="kr-count-badge">
                      {filteredPlots.length}
                    </span>{' '}
                    {tPlots('ofPlots')}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{tPlots('tipClick')}</div>
                </div>

                {/* Scrollable Grid */}
                <div className="kr-plots-scroll">
                  {filteredPlots.length > 0 ? (
                    <div className="kr-plots-grid" id="krPlotsGrid">
                      {filteredPlots.map((plot) => {
                        const isSelected = selectedPlot?.parcelNo === plot.parcelNo;
                        return (
                          <div
                            key={plot.id}
                            className={`kr-plot-card ${isSelected ? 'selected' : ''}`}
                            data-parcel={plot.parcelNo}
                            data-block={plot.fullCode}
                            onClick={() => handleSelectPlot(plot)}
                          >
                            <div className="kr-plot-top">
                              <span className="kr-plot-parcel">Parcel #{plot.parcelNo}</span>
                              <span className="kr-plot-block-tag">{plot.block}</span>
                            </div>
                            <div className="kr-plot-bottom">
                              <span>{plot.fullCode}</span>
                              <span className="kr-plot-action">{tPlots('enquireArrow')}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div id="krNoResults" className="kr-no-results">
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔍</div>
                      <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                        {tPlots('noResultsTitle')}
                      </div>
                      <div style={{ fontSize: '13px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.5 }}>
                        {tPlots('noResultsDesc')}
                      </div>
                      <button
                        type="button"
                        className="kr-no-results-btn"
                        id="krEnquireNotFoundBtn"
                        onClick={handleEnquireNotFound}
                      >
                        {tPlots('sendEnquiryParcel')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2-COLUMN SECTION: PROJECT OFFICE & ENQUIRY FORM          */}
        {/* ======================================================== */}
        <div className="kr-contact-grid">
          {/* Left Column: Official Contact Details */}
          <div className="kr-contact-info-col">
            {/* 1. Project Office */}
            <div className="kr-contact-info-card">
              <svg className="kr-contact-icon" viewBox="0 0 384 512">
                <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
              </svg>
              <div>
                <h3 className="kr-contact-card-title">{t('projectOfficeTitle')}</h3>
                <p className="kr-contact-card-text">
                  {t('projectOfficeAddressLine1')}
                  <br />
                  {t('projectOfficeAddressLine2')}
                  <br />
                  {t('projectOfficeAddressLine3')}
                </p>
              </div>
            </div>

            {/* 2. Official Phone Lines */}
            <div className="kr-contact-info-card">
              <svg className="kr-contact-icon" viewBox="0 0 512 512">
                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
              </svg>
              <div>
                <h3 className="kr-contact-card-title">{t('officialPhoneLines')}</h3>
                <p className="kr-contact-card-text" style={{ fontWeight: 600 }}>
                  {t('enquiriesPlotStatus')}
                </p>
                <ul className="kr-contact-phone-list">
                  <li className="kr-contact-phone-item">
                    <a href="https://wa.me/+254723261973" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 448 512">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                      <span>0723 261 973</span>
                    </a>
                  </li>
                  <li className="kr-contact-phone-item">
                    <a href="https://wa.me/+254716953637" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 448 512">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                      <span>0716 953 637</span>
                    </a>
                  </li>
                </ul>
                <p className="kr-contact-card-text" style={{ fontSize: '13.5px', color: '#666666' }}>
                  {t('phoneHours')}
                </p>
              </div>
            </div>

            {/* 3. Official Email */}
            <div className="kr-contact-info-card">
              <svg className="kr-contact-icon" viewBox="0 0 512 512">
                <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
              </svg>
              <div>
                <h3 className="kr-contact-card-title">{t('officialEmail')}</h3>
                <p className="kr-contact-card-text">
                  <a href={`mailto:${t('emailAddress')}`} style={{ color: '#E10600', textDecoration: 'none', fontWeight: 600 }}>
                    {t('emailAddress')}
                  </a>
                </p>
              </div>
            </div>

            {/* 4. Office Hours */}
            <div className="kr-contact-info-card">
              <svg className="kr-contact-icon" viewBox="0 0 512 512">
                <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z" />
              </svg>
              <div>
                <h3 className="kr-contact-card-title">{t('officeHours')}</h3>
                <p className="kr-contact-card-text">
                  {t('officeHoursLine1')}
                  <br />
                  {t('officeHoursLine2')}
                  <br />
                  {t('officeHoursLine3')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Send an Enquiry Form */}
          <div className="kr-enquiry-form-col">
            <h2 className="kr-enquiry-title">{t('sendEnquiry')}</h2>
            <p className="kr-enquiry-subtitle">{t('sendEnquirySubtitle')}</p>

            {/* Active Plot Chip (if a plot is selected) */}
            {selectedPlot && (
              <div id="krActivePlotChip" className="kr-active-plot-chip">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>📍</span>
                  <div>
                    <strong>{selectedPlot.fullCode}</strong> (Parcel #{selectedPlot.parcelNo})
                    <div style={{ fontSize: '11.5px', color: '#E10600', fontWeight: 600 }}>
                      {t('activePlotBanner')}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  id="krClearActivePlot"
                  title="Clear plot selection"
                  onClick={handleClearSelectedPlot}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    color: '#E10600',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    lineHeight: 1,
                    padding: '2px 8px',
                  }}
                >
                  &times;
                </button>
              </div>
            )}

            <form id="kirima-enquiry-form" onSubmit={handleSubmitEmail} className="kr-custom-enquiry-form">
              {/* Honey pot */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} />

              <p>
                <label>
                  {t('nameLabel')}
                  <br />
                  <span className="wpcf7-form-control-wrap">
                    <input
                      id="kr-name-input"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                      required
                    />
                  </span>
                </label>
              </p>

              <p>
                <label>
                  {t('emailLabel')}
                  <br />
                  <span className="wpcf7-form-control-wrap">
                    <input
                      id="kr-email-input"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required"
                      required
                    />
                  </span>
                </label>
              </p>

              <p>
                <label>
                  {t('phoneLabel')}
                  <br />
                  <span className="wpcf7-form-control-wrap">
                    <input
                      id="kr-phone-input"
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('phonePlaceholder')}
                      className="wpcf7-form-control wpcf7-text"
                    />
                  </span>
                </label>
              </p>

              <p>
                <label>
                  {t('subjectLabel')}
                  <br />
                  <span className="wpcf7-form-control-wrap">
                    <input
                      id="kr-subject-input"
                      type="text"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                      required
                    />
                  </span>
                </label>
              </p>

              <p>
                <label>
                  {t('messageLabel')}
                  <br />
                  <span className="wpcf7-form-control-wrap">
                    <textarea
                      id="kr-message-input"
                      name="message"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="wpcf7-form-control wpcf7-textarea"
                    />
                  </span>
                </label>
              </p>

              {/* Dual Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '14px' }}>
                <button
                  type="submit"
                  id="kirima-submit-btn"
                  className="kr-form-btn-email"
                  style={{
                    flex: '1 1 200px',
                    background: '#E10600',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '14px 22px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '15px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 3px 10px rgba(151,11,16,0.25)',
                  }}
                >
                  <svg style={{ width: '18px', height: '18px', fill: '#FFFFFF' }} viewBox="0 0 512 512">
                    <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
                  </svg>
                  <span>{t('sendViaEmail')}</span>
                </button>

                <button
                  type="button"
                  id="kr-whatsapp-submit-btn"
                  className="kr-form-btn-whatsapp"
                  onClick={handleWhatsAppSubmit}
                  style={{
                    flex: '1 1 200px',
                    background: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '14px 22px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '15px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 3px 10px rgba(37,211,102,0.25)',
                  }}
                >
                  <svg style={{ width: '18px', height: '18px', fill: '#FFFFFF' }} viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  <span>{t('enquireViaWhatsApp')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. LOADING SPINNER OVERLAY */}
      {isLoading && (
        <div className="kr-loading-overlay" style={{ display: 'flex' }}>
          <div className="kr-loading-card">
            <div className="kr-spinner-ring" />
            <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 700, color: '#111827' }}>
              {locale === 'sw' ? 'Inatuma Uchunguzi...' : 'Sending Enquiry...'}
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
              {locale === 'sw' ? 'Tafadhali subiri kidogo...' : 'Connecting to Kirima Rise desk...'}
            </p>
          </div>
        </div>
      )}

      {/* 4. SUCCESS POPUP MODAL (100% Matching sample-page/index.html) */}
      {showModal && submittedData && (
        <div className="kr-modal-backdrop" style={{ display: 'flex' }}>
          <div className="kr-modal-dialog">
            <button type="button" className="kr-modal-close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <div className="kr-modal-header">
              <div className="kr-success-badge">
                <svg className="kr-check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h3 className="kr-modal-title" style={{ color: '#FFFFFF', margin: 0 }}>
                {t('modalTitle')}
              </h3>
            </div>
            <div className="kr-modal-body">
              <p className="kr-modal-intro">{t('modalIntro')}</p>
              <div className="kr-modal-summary-box">
                <div>
                  <strong>{t('nameLabel')}:</strong> {submittedData.name}
                </div>
                <div className="kr-modal-summary-item">
                  <strong>{t('emailLabel')}:</strong> {submittedData.email}
                </div>
                {submittedData.phone && (
                  <div className="kr-modal-summary-item">
                    <strong>{locale === 'sw' ? 'Simu' : 'Phone'}:</strong> {submittedData.phone}
                  </div>
                )}
                <div className="kr-modal-summary-item">
                  <strong>{t('subjectLabel')}:</strong> {submittedData.subject}
                </div>
              </div>
              <div className="kr-modal-actions">
                <a
                  className="kr-modal-btn-wa"
                  onClick={handleWhatsAppSubmit}
                  style={{ cursor: 'pointer' }}
                >
                  <svg style={{ width: '18px', height: '18px', fill: '#FFFFFF' }} viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  <span>{t('modalWhatsAppBtn')}</span>
                </a>
                <button type="button" className="kr-modal-btn-done" onClick={handleCloseModal}>
                  {t('modalDone')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
