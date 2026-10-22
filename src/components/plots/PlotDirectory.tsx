'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Plot, getAllPlots } from '@/lib/plots';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { Search, Filter, ShieldCheck, CheckCircle2, MessageCircle, FileText, ChevronRight } from 'lucide-react';

interface PlotDirectoryProps {
  onSelectPlot?: (plot: Plot) => void;
  selectedPlotId?: string;
}

export default function PlotDirectory({ onSelectPlot, selectedPlotId }: PlotDirectoryProps) {
  const t = useTranslations('plots');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const allPlots = useMemo(() => getAllPlots(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<'ALL' | 'Block 220' | 'Block 179'>('ALL');

  // Filtered plots
  const filteredPlots = useMemo(() => {
    return allPlots.filter((plot) => {
      const matchesBlock =
        selectedBlock === 'ALL' ||
        (selectedBlock === 'Block 220' && plot.block.includes('220')) ||
        (selectedBlock === 'Block 179' && plot.block.includes('179'));

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        plot.parcelNo.toLowerCase().includes(q) ||
        plot.fullCode.toLowerCase().includes(q) ||
        plot.block.toLowerCase().includes(q);

      return matchesBlock && matchesQuery;
    });
  }, [allPlots, selectedBlock, searchQuery]);

  const block220Count = allPlots.filter((p) => p.block.includes('220')).length;
  const block179Count = allPlots.filter((p) => p.block.includes('179')).length;

  return (
    <div className="bg-white rounded-2xl shadow-brand border border-kirima-border overflow-hidden">
      {/* Directory Header Bar */}
      <div className="bg-kirima-sand p-6 sm:p-8 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-kirima-green text-white mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('badgeVerified')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-kirima-charcoal">
              {t('subtitle')}
            </h3>
            <p className="text-xs sm:text-sm text-kirima-muted mt-1">
              {t('description')}
            </p>
          </div>

          <div className="text-right flex items-center md:flex-col md:items-end justify-between md:justify-center gap-2">
            <span className="text-xs font-semibold text-kirima-muted">
              {t('showing')} <strong className="text-kirima-charcoal font-bold text-sm">{filteredPlots.length}</strong> {t('of')} {allPlots.length} {t('plotsText')}
            </span>
            <span className="text-[11px] text-kirima-green font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">
              {t('statusReadyTitle')}
            </span>
          </div>
        </div>

        {/* Toolbar: Search and Category Pills */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kirima-green focus:border-kirima-green bg-white shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                &times;
              </button>
            )}
          </div>

          {/* Block Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedBlock('ALL')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedBlock === 'ALL'
                  ? 'bg-kirima-green text-white shadow-sm'
                  : 'bg-white text-kirima-charcoal border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t('filterAll')} ({allPlots.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedBlock('Block 220')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedBlock === 'Block 220'
                  ? 'bg-kirima-green text-white shadow-sm'
                  : 'bg-white text-kirima-charcoal border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t('filterBlock220')} ({block220Count})
            </button>
            <button
              type="button"
              onClick={() => setSelectedBlock('Block 179')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedBlock === 'Block 179'
                  ? 'bg-kirima-green text-white shadow-sm'
                  : 'bg-white text-kirima-charcoal border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t('filterBlock179')} ({block179Count})
            </button>
          </div>
        </div>
      </div>

      {/* Directory Grid / Scroll Area */}
      <div className="p-4 sm:p-6">
        <p className="text-[11px] text-kirima-muted mb-4 italic">
          {t('tip')}
        </p>

        {filteredPlots.length === 0 ? (
          <div className="text-center py-12 px-4 border border-dashed border-gray-200 rounded-xl">
            <Filter className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-kirima-charcoal mb-1">
              {t('noResultsTitle')}
            </h4>
            <p className="text-xs text-kirima-muted max-w-md mx-auto leading-relaxed mb-4">
              {t('noResultsDesc')}
            </p>
            <button
              type="button"
              onClick={() => {
                if (onSelectPlot) {
                  onSelectPlot({
                    id: 'custom-query',
                    parcelNo: searchQuery || 'Not Listed',
                    block: selectedBlock !== 'ALL' ? selectedBlock : 'General',
                    fullCode: searchQuery || 'Custom Parcel Inquiry',
                    size: 'Standard',
                    sizeMetric: '',
                    location: 'Njiru',
                    titleStatus: 'ready',
                    batch: 'Special Verification',
                    status: 'available',
                    use: 'Residential',
                  });
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-kirima-red text-white text-xs font-bold rounded uppercase tracking-wider hover:bg-kirima-red-dark transition-colors"
            >
              <span>{t('enquireNotFound')}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredPlots.map((plot) => {
              const isSelected = selectedPlotId === plot.id;
              const whatsAppHref = getWhatsAppUrl(locale, {
                parcelNo: plot.parcelNo,
                block: plot.block,
              });

              return (
                <div
                  key={plot.id}
                  onClick={() => onSelectPlot && onSelectPlot(plot)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'border-kirima-red bg-red-50/50 shadow-md ring-2 ring-kirima-red/20'
                      : 'border-gray-200 bg-white hover:border-kirima-green hover:shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top Row: Full Code & Ready Title Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono font-bold text-sm text-kirima-charcoal group-hover:text-kirima-green transition-colors">
                        {plot.fullCode}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-kirima-green uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {t('statusReadyTitle')}
                      </span>
                    </div>

                    {/* Metadata details */}
                    <div className="grid grid-cols-2 gap-1 text-[11px] text-kirima-muted mb-3">
                      <div>
                        <span className="text-gray-400 block text-[10px]">{t('labelSize')}:</span>
                        <span className="font-medium text-gray-700">{plot.size}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">{t('labelBlock')}:</span>
                        <span className="font-medium text-gray-700">{plot.block}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      className="text-xs font-bold text-kirima-red flex items-center gap-1 group-hover:underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{t('ctaEnquire')}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>

                    <a
                      href={whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-full bg-green-50 text-[#25D366] hover:bg-green-100 transition-colors"
                      title="Ulizia kwa WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
