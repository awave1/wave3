import { useWave } from "features/Wave/useWave";

export function Wave() {
  const { handlers, models } = useWave();
  return (
    <button
      onClick={handlers.onWaveClicked}
    >{`total waves: ${models.waveCount}`}</button>
  );
}
