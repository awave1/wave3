import { Loading } from "features/Wave/components/Loading";
import { useWave } from "features/Wave/useWave";

export function Wave() {
  const {
    handlers,
    models: { mining, waveCount, waveHash },
  } = useWave();
  return mining ? (
    <Loading hash={waveHash} />
  ) : (
    <button
      onClick={handlers.onWaveClicked}
    >{`total waves: ${waveCount}`}</button>
  );
}
