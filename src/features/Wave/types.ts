export interface UseWaveProps {
  models: {
    waveCount: number;
    mining: boolean;
    waveHash: string;
  };
  handlers: {
    onWaveClicked: () => void;
  };
}
