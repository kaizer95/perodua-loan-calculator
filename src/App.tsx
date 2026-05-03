import { useMemo, useState } from 'react'
import './App.css'
import { carPrices } from './data/carPrices'
import peroduaLogo from '../perodua.png'
import aruzImage from '../aruz.png'
import alzaImage from '../alza.png'
import ativaImage from '../ativa.png'
import myviImage from '../myvi.png'
import axiaImage from '../axia.png'
import {
  DEFAULT_INTEREST_RATE,
  buildPaymentRows,
  calculateMonthlyPayment,
  calculateLoanSummary,
  parseInputNumber,
} from './lib/calculator'

const currencyFormatter = new Intl.NumberFormat('ms-MY', {
  style: 'currency',
  currency: 'MYR',
})

function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

interface ModelColorOption {
  label: string
  swatch: string
}

interface ModelPreviewAsset {
  carSrc: string
  colorSrc?: string
  colorOptions?: ModelColorOption[]
}

const modelPreviewAssets: Record<string, ModelPreviewAsset> = {
  ARUZ: {
    carSrc: aruzImage,
    colorOptions: [
      { label: 'Elegent Black', swatch: '#1a1a1a' },
      { label: 'Garnet Red*', swatch: '#7d1b2f' },
      { label: 'Electric Blue', swatch: '#165ec9' },
      { label: 'Granite Grey', swatch: '#6f7379' },
      { label: 'Gliterig Silver', swatch: '#b7bcc2' },
      { label: 'Ivory White', swatch: '#f4f1e8' },
    ],
  },
  ALZA: {
    carSrc: alzaImage,
    colorOptions: [
      { label: 'Vintage Brown*', swatch: '#6b4b3f' },
      { label: 'Elegant Black', swatch: '#1a1a1a' },
      { label: 'Garnet Red*', swatch: '#7d1b2f' },
      { label: 'Glittering Silver', swatch: '#b7bcc2' },
      { label: 'Ivory White', swatch: '#f4f1e8' },
    ],
  },
  ATIVA: {
    carSrc: ativaImage,
    colorOptions: [
      { label: 'Pearl Delima Red*', swatch: '#8a1f3a' },
      { label: 'Pearl Diamond White*', swatch: '#f8f7f1' },
      { label: 'Cobalt Blue*', swatch: '#1f57c8' },
      { label: 'Granite Grey', swatch: '#6f7379' },
      { label: 'Glittering Silver', swatch: '#b7bcc2' },
    ],
  },
  MYVI: {
    carSrc: myviImage,
    colorOptions: [
      { label: 'Cranberry Red*', swatch: '#8a2038' },
      { label: 'Electric Blue', swatch: '#165ec9' },
      { label: 'Granite Grey', swatch: '#6f7379' },
      { label: 'Ivory White', swatch: '#f4f1e8' },
      { label: 'Glittering Silver', swatch: '#b7bcc2' },
    ],
  },
  AXIA: {
    carSrc: axiaImage,
    colorOptions: [
      { label: 'Coral Blue', swatch: '#2e72d2' },
      { label: 'Granite Grey', swatch: '#6f7379' },
      { label: 'Lava Red', swatch: '#8f1f2d' },
      { label: 'Glittering Silver', swatch: '#b7bcc2' },
      { label: 'Ivory White', swatch: '#f4f1e8' },
    ],
  },
}

function App() {
  const firstModel = carPrices[0]

  const [selectedModel, setSelectedModel] = useState(firstModel?.model ?? '')
  const [selectedVariantName, setSelectedVariantName] = useState(
    firstModel?.variants[0]?.name ?? '',
  )

  const [downpaymentInput, setDownpaymentInput] = useState('0')
  const [rebateInput, setRebateInput] = useState('2000')
  const [ncdInput, setNcdInput] = useState('0')
  const [interestRateInput, setInterestRateInput] = useState(
    DEFAULT_INTEREST_RATE.toString(),
  )

  const selectedModelData = useMemo(
    () => carPrices.find((entry) => entry.model === selectedModel) ?? firstModel,
    [firstModel, selectedModel],
  )

  const selectedVariant = useMemo(() => {
    const variants = selectedModelData?.variants ?? []
    return variants.find((entry) => entry.name === selectedVariantName) ?? variants[0]
  }, [selectedModelData, selectedVariantName])

  const downpayment = parseInputNumber(downpaymentInput)
  const rebate = parseInputNumber(rebateInput)
  const ncdPercent = parseInputNumber(ncdInput)
  const interestRate = parseInputNumber(interestRateInput)

  const summary = calculateLoanSummary({
    otrPrice: selectedVariant?.onTheRoadPrice ?? 0,
    rebate,
    ncdPercent,
    downpayment,
  })

  const paymentRows = useMemo(
    () => buildPaymentRows(summary.loanAmount, interestRate),
    [interestRate, summary.loanAmount],
  )
  const fullLoanNineYearMonthly = useMemo(
    () => calculateMonthlyPayment(summary.otrPrice, 9, interestRate),
    [interestRate, summary.otrPrice],
  )

  const selectedModelPreview = modelPreviewAssets[selectedModel]

  function handleModelChange(model: string): void {
    setSelectedModel(model)

    const firstVariant =
      carPrices.find((entry) => entry.model === model)?.variants[0]?.name ?? ''
    setSelectedVariantName(firstVariant)
  }

  return (
    <div className="app-shell">
      <header className="app-header panel">
        <div className="brand-block">
          <div className="logo-wrap" aria-hidden="true">
            <img src={peroduaLogo} alt="" />
          </div>

          <div className="title-wrap">
            <p className="eyebrow">Perodua financing simulator</p>
            <h1>Car Loan Calculator</h1>
            <p className="subtitle">
              Calculate flat-rate monthly installments for 9, 7, and 5-year terms
              using current on-the-road prices.
            </p>
          </div>

          <aside className="contact-card" aria-label="Sales contact">
            <p className="contact-label">Sales Contact</p>
            <p className="contact-name">SAPRI</p>
            <a className="contact-phone" href="tel:+60183698507">
              018-3698507
            </a>
          </aside>
        </div>
      </header>

      <main className="calculator-layout">
        <section className="panel controls-panel" aria-label="Calculator inputs">
          <h2>Vehicle and inputs</h2>

          <label htmlFor="model" className="field-label">
            Model
          </label>
          <select
            id="model"
            className="field-control"
            value={selectedModel}
            onChange={(event) => handleModelChange(event.target.value)}
          >
            {carPrices.map((entry) => (
              <option key={entry.model} value={entry.model}>
                {entry.model}
              </option>
            ))}
          </select>

          <label htmlFor="variant" className="field-label">
            Variant
          </label>
          <select
            id="variant"
            className="field-control"
            value={selectedVariant?.name ?? ''}
            onChange={(event) => setSelectedVariantName(event.target.value)}
          >
            {(selectedModelData?.variants ?? []).map((entry) => (
              <option key={entry.name} value={entry.name}>
                {entry.name}
              </option>
            ))}
          </select>

          <label htmlFor="rebate" className="field-label">
            Rebate (RM)
          </label>
          <input
            id="rebate"
            className="field-control"
            type="number"
            min={0}
            step="100"
            inputMode="decimal"
            value={rebateInput}
            onChange={(event) => setRebateInput(event.target.value)}
          />

          <label htmlFor="downpayment" className="field-label">
            Downpayment (RM)
          </label>
          <input
            id="downpayment"
            className="field-control"
            type="number"
            min={0}
            step="100"
            inputMode="decimal"
            value={downpaymentInput}
            onChange={(event) => setDownpaymentInput(event.target.value)}
          />

          <label htmlFor="ncd" className="field-label">
            NCD (%)
          </label>
          <input
            id="ncd"
            className="field-control"
            type="number"
            min={0}
            max={100}
            step="0.01"
            inputMode="decimal"
            value={ncdInput}
            onChange={(event) => setNcdInput(event.target.value)}
          />

          <label htmlFor="interest-rate" className="field-label">
            Interest rate (%)
          </label>
          <input
            id="interest-rate"
            className="field-control"
            type="number"
            min={0}
            step="0.01"
            inputMode="decimal"
            value={interestRateInput}
            onChange={(event) => setInterestRateInput(event.target.value)}
          />

          <p className="interest-note">
            Interest rate in table: <strong>{interestRate.toFixed(2)}%</strong>{' '}
            flat per year
          </p>
        </section>

        <section className="panel results-panel" aria-label="Calculation results">
          <h2>Loan summary</h2>

          <dl className="summary-grid">
            <div className="summary-item">
              <dt>ON THE ROAD</dt>
              <dd>{formatCurrency(summary.otrPrice)}</dd>
            </div>

            <div className="summary-item">
              <dt>REBATE</dt>
              <dd>{formatCurrency(summary.rebateAmount)}</dd>
            </div>

            <div className="summary-item">
              <dt>NCD %</dt>
              <dd>{(summary.ncdRate * 100).toFixed(2)}%</dd>
            </div>

            <div className="summary-item">
              <dt>NCD DISCOUNT</dt>
              <dd>{formatCurrency(summary.ncdDiscount)}</dd>
            </div>

            <div className="summary-item total-item">
              <dt>TOTAL OTR</dt>
              <dd>{formatCurrency(summary.totalOtr)}</dd>
            </div>

            <div className="summary-item total-item">
              <dt>LOAN</dt>
              <dd>{formatCurrency(summary.loanAmount)}</dd>
            </div>
          </dl>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Years</th>
                  <th>Months</th>
                  <th>Interest</th>
                  <th>Monthly Payment</th>
                </tr>
              </thead>
              <tbody>
                {paymentRows.map((row) => (
                  <tr key={row.years}>
                    <td>{row.years}</td>
                    <td>{row.months}</td>
                    <td>{row.interestRate.toFixed(2)}%</td>
                    <td>{formatCurrency(row.monthly)}</td>
                  </tr>
                ))}
                <tr className="full-loan-row">
                  <td>9 (Full Loan)</td>
                  <td>108</td>
                  <td>{interestRate.toFixed(2)}%</td>
                  <td>{formatCurrency(fullLoanNineYearMonthly)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {selectedModelPreview && (
            <section
              className="vehicle-preview"
              aria-label={`${selectedModel} visuals`}
            >
              <p className="preview-heading">
                {selectedModel} preview and available colors
              </p>
              <div className="preview-media">
                <img
                  className="preview-car"
                  src={selectedModelPreview.carSrc}
                  alt={`Perodua ${selectedModel}`}
                />
                {selectedModelPreview.colorOptions ? (
                  <ul
                    className="preview-color-options"
                    aria-label={`${selectedModel} available colors`}
                  >
                    {selectedModelPreview.colorOptions.map((option) => (
                      <li key={option.label} className="preview-color-option">
                        <span
                          className="preview-color-swatch"
                          style={{ backgroundColor: option.swatch }}
                          aria-hidden="true"
                        />
                        <span>{option.label}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <img
                    className="preview-colors"
                    src={selectedModelPreview.colorSrc}
                    alt={`${selectedModel} available colors`}
                  />
                )}
              </div>
            </section>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
