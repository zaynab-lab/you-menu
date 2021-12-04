import { styles } from "@/public/js/styles";

export default function CurrencySelector({
  selectedCurrency,
  setSelectedCurrency,
  defaultCurrency,
  currency
}) {
  return (
    <>
      <div
        className="currencySelector"
        onClick={() => setSelectedCurrency((def) => !def)}
      >
        {!selectedCurrency ? (
          <div className="currencySelectorItem">{defaultCurrency}</div>
        ) : (
          <div className="currencySelectorItem">{currency}</div>
        )}
      </div>
      <style jsx>{`
        .currencySelector {
          position: fixed;
          right: 0;
          top: 14rem;
          z-index: 110;
          font-size: 0.9rem;
        }
        .currencySelectorItem {
          padding: 0.3rem 0.4rem;
          padding-right: 0.1rem;
          background: ${styles.lineargradeint};
          color: white;
          border: 1px solid white;
          border-width: 1px 0px 1px 1px;
          border-radius: 0.8rem 0 0 0.8rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
