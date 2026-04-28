import { Progress } from './AppProperties';

export const EXPORT_TIMEOUT = 4000;
export const IMPORT_TIMEOUT = 5000;

export enum FileFormats {
  Jpeg = 'jpeg',
  Png = 'png',
  Tiff = 'tiff',
  Webp = 'webp',
  Jxl = 'jxl',
  Avif = 'avif',
  Cube = 'cube',
}

export enum OutputColorSpace {
  Srgb = 'srgb',
  DisplayP3 = 'displayP3',
  Rec2020 = 'rec2020',
  Rec2100Pq = 'rec2100Pq',
}

export enum JpegExportMode {
  Standard = 'standard',
  UltraHdr = 'ultraHdr',
}

export enum OutputBitDepth {
  Eight = 8,
  Ten = 10,
  Sixteen = 16,
}

export const OUTPUT_COLOR_SPACE_OPTIONS = [
  { label: 'sRGB', value: OutputColorSpace.Srgb },
  { label: 'Display P3', value: OutputColorSpace.DisplayP3 },
  { label: 'Rec. 2020', value: OutputColorSpace.Rec2020 },
  { label: 'Rec. 2100 PQ', value: OutputColorSpace.Rec2100Pq },
];

export const getOutputBitDepthOptions = (formatId: string) => {
  switch (formatId) {
    case FileFormats.Png:
      return [
        { label: '8-bit', value: OutputBitDepth.Eight },
        { label: '16-bit', value: OutputBitDepth.Sixteen },
      ];
    case FileFormats.Tiff:
      return [{ label: '16-bit', value: OutputBitDepth.Sixteen }];
    default:
      return [];
  }
};

export const getDefaultOutputBitDepth = (formatId: string): OutputBitDepth | null => {
  const [defaultOption] = getOutputBitDepthOptions(formatId);
  return defaultOption?.value ?? null;
};

export const FILE_FORMATS: Array<FileFormat> = [
  { id: FileFormats.Jpeg, name: 'JPEG', extensions: ['jpg', 'jpeg'] },
  { id: FileFormats.Png, name: 'PNG', extensions: ['png'] },
  { id: FileFormats.Tiff, name: 'TIFF', extensions: ['tiff'] },
  { id: FileFormats.Webp, name: 'WebP', extensions: ['webp'] },
  { id: FileFormats.Jxl, name: 'JPEG XL', extensions: ['jxl'] },
  { id: FileFormats.Avif, name: 'AVIF', extensions: ['avif'] },
  { id: FileFormats.Cube, name: 'CUBE LUT', extensions: ['cube'] },
];

export const FILENAME_VARIABLES: Array<string> = [
  '{original_filename}',
  '{sequence}',
  '{YYYY}',
  '{MM}',
  '{DD}',
  '{hh}',
  '{mm}',
];

export interface ExportSettings {
  filenameTemplate: string | null;
  jpegQuality: number;
  outputColorSpace: OutputColorSpace;
  outputBitDepth: OutputBitDepth | null;
  jpegExportMode: JpegExportMode;
  keepMetadata: boolean;
  preserveTimestamps: boolean;
  resize: {
    mode: string;
    value: number;
    dontEnlarge: boolean;
  } | null;
  stripGps: boolean;
  watermark: WatermarkSettings | null;
  exportMasks?: boolean;
  preserveFolders?: boolean;
}

export enum WatermarkAnchor {
  TopLeft = 'topLeft',
  TopCenter = 'topCenter',
  TopRight = 'topRight',
  CenterLeft = 'centerLeft',
  Center = 'center',
  CenterRight = 'centerRight',
  BottomLeft = 'bottomLeft',
  BottomCenter = 'bottomCenter',
  BottomRight = 'bottomRight',
}

export interface WatermarkSettings {
  path: string;
  anchor: WatermarkAnchor;
  scale: number;
  spacing: number;
  opacity: number;
}

export interface ExportState {
  errorMessage: string;
  progress: Progress;
  status: Status;
}

export interface FileFormat {
  extensions: Array<string>;
  id: string;
  name: string;
}

export interface ImportState {
  errorMessage: string;
  path?: string;
  progress?: Progress;
  status: Status;
}

export enum Status {
  Cancelled = 'cancelled',
  Exporting = 'exporting',
  Error = 'error',
  Idle = 'idle',
  Importing = 'importing',
  Success = 'success',
}

export interface ExportPreset {
  id: string;
  name: string;
  fileFormat: string;
  jpegQuality: number;
  outputColorSpace: OutputColorSpace;
  outputBitDepth: OutputBitDepth | null;
  jpegExportMode: JpegExportMode;
  enableResize: boolean;
  resizeMode: string;
  resizeValue: number;
  dontEnlarge: boolean;
  keepMetadata: boolean;
  preserveTimestamps: boolean;
  stripGps: boolean;
  exportMasks?: boolean;
  preserveFolders?: boolean;
  filenameTemplate: string;
  enableWatermark: boolean;
  watermarkPath: string | null;
  watermarkAnchor: string;
  watermarkScale: number;
  watermarkSpacing: number;
  watermarkOpacity: number;
  lastExportPath?: string;
}
