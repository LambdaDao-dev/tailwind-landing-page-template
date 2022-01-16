import { useEffect } from "react";
import { smartTrim } from "../../utils/utils";
import { getAddChainParameters } from "../connectors/chains";
import { metaMask, hooks, store } from "../connectors/metamask";

const chainId = 1;

export default function Button() {
  const {
    useProvider,
    useIsActivating,
    useError,
    useIsActive,
    useAccount,
    useChainId,
    useENSNames,
  } = hooks;

  const provider = useProvider();
  const currentChainId = useChainId();
  const isActivating = useIsActivating();
  const error = useError();
  const active = useIsActive();
  const account = useAccount();
  const ens = useENSNames(provider);

  useEffect(() => {
    if (chainId !== currentChainId) {
    }
  }, [currentChainId]);

  let child: JSX.Element;

  if (error) {
    child = <>Connect Failed</>;
  } else if (currentChainId !== chainId) {
    child = <>Wrong network</>;
  } else if (isActivating) {
    child = <>Connecting...</>;
  } else if (active) {
    if (ens?.length > 0) {
      child = <>{ens[0]}</>;
    } else {
      child = <>{smartTrim(account, 10)}</>;
    }
  } else {
    child = (
      <>
        <span>Connect Wallet</span>
        <svg
          className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
            fillRule="nonzero"
          />
        </svg>
      </>
    );
  }

  return (
    <button
      disabled={isActivating}
      className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
      onClick={async () => {
        if (currentChainId !== chainId || !active) {
          await metaMask.activate(getAddChainParameters(chainId));
        }
      }}
    >
      {child}
    </button>
  );
}
