import { Loading } from "features/Wave/components/Loading";
import { useWave } from "features/Wave/useWave";

export function Wave() {
  const {
    handlers,
    models: { mining, waveCount, waveHash },
  } = useWave();
  return (
    <Loading hash="0x37d51e62e867c8eef3f0501bff499471f7fe3ec736616ac01343db25e0c45512" />
  );
  // return mining ? (
  //   <Loading hash={waveHash} />
  // ) : (
  //   <button
  //     className="self-start my-6 mx-auto py-2 px-4 bg-gray-200 text-gray-900 uppercase font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none"
  //     onClick={handlers.onWaveClicked}
  //   >{`total waves: ${waveCount}`}</button>
  // );
}
