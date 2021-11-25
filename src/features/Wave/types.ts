import type { ChangeEvent } from "react";

export interface UseWaveProps {
  models: {
    waveCount: number;
    mining: boolean;
    waveHash: string;
    message: string;
  };
  handlers: {
    onWaveClicked: () => void;
    onMessageInput: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  };
}
