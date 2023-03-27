declare module "@analytics/google-tag-manager" {
  export default function GoogleTagManagerPlugin(options: {
    containerId: string;
    dataLayerName?: string;
  }): Record<string, any>;
}
