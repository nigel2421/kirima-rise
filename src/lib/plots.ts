import plotsData from '../../public/data/plots.json';

export interface Plot {
  id: string;
  parcelNo: string;
  block: string;
  fullCode: string;
  size: string;
  sizeMetric: string;
  location: string;
  titleStatus: 'ready' | 'processing';
  batch: string;
  status: 'available' | 'reserved' | 'regularised';
  use: string;
}

export function getAllPlots(): Plot[] {
  return plotsData as Plot[];
}

export function getPlotById(id: string): Plot | undefined {
  const plots = getAllPlots();
  return plots.find(
    (p) => p.id === id || p.parcelNo === id || p.fullCode.toLowerCase() === id.toLowerCase()
  );
}

export function getBlockStats() {
  const plots = getAllPlots();
  const total = plots.length;
  const block220 = plots.filter((p) => p.block.includes('220')).length;
  const block179 = plots.filter((p) => p.block.includes('179')).length;
  return { total, block220, block179 };
}
