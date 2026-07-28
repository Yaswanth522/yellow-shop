import { useState } from 'react'
import './ProductRegistrationForm.css'

const PRODUCT_CATEGORIES = [
  'Electronics',
  'Home Appliance',
  'Wearable',
  'Software / App',
  'Other',
]

const PURCHASE_SOURCES = ['Online', 'Retail Store', 'Reseller', 'Other']

const USE_CASES = ['Personal', 'Business', 'Gift', 'Other']

const USAGE_FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Rarely']

const INITIAL_FORM = {
  ownerName: '',
  email: '',
  phone: '',
  productName: '',
  productCategory: '',
  serialNumber: '',
  purchaseDate: '',
  purchaseSource: '',
  useCase: '',
  usageFrequency: '',
  comments: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}

  if (!form.ownerName.trim()) errors.ownerName = 'Please enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.productName.trim()) errors.productName = 'Please enter the product name.'
  if (!form.productCategory) errors.productCategory = 'Please select a category.'
  if (!form.purchaseSource) errors.purchaseSource = 'Please select where it was purchased.'
  if (!form.useCase) errors.useCase = 'Please select a primary use case.'
  if (!form.usageFrequency) errors.usageFrequency = 'Please select how often you use it.'

  return errors
}

export default function ProductRegistrationForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(field) {
    return (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
    }
  }

  function handleRegisterAnother() {
    setForm(INITIAL_FORM)
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="form-card">
        <div className="success">
          <div className="success-icon">✓</div>
          <h2>Product registered!</h2>
          <p>
            Thanks, {form.ownerName.split(' ')[0]}. Your {form.productName} has been
            registered. We&apos;ve sent a confirmation to {form.email}.
          </p>
          <button type="button" className="btn-secondary" onClick={handleRegisterAnother}>
            Register another product
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Product Registration</h2>
      <p className="form-subtitle">Tell us a bit about you and your product.</p>

      <fieldset className="form-section">
        <legend>Your details</legend>

        <div className="field">
          <label htmlFor="ownerName">Full name</label>
          <input
            id="ownerName"
            type="text"
            placeholder="Jane Doe"
            value={form.ownerName}
            onChange={handleChange('ownerName')}
            aria-invalid={Boolean(errors.ownerName)}
          />
          {errors.ownerName && <span className="field-error">{errors.ownerName}</span>}
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange('email')}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 555 123 4567"
              value={form.phone}
              onChange={handleChange('phone')}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Product details</legend>

        <div className="field">
          <label htmlFor="productName">Product name</label>
          <input
            id="productName"
            type="text"
            placeholder="e.g. Yellow Smart Speaker"
            value={form.productName}
            onChange={handleChange('productName')}
            aria-invalid={Boolean(errors.productName)}
          />
          {errors.productName && <span className="field-error">{errors.productName}</span>}
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="productCategory">Product category</label>
            <select
              id="productCategory"
              value={form.productCategory}
              onChange={handleChange('productCategory')}
              aria-invalid={Boolean(errors.productCategory)}
            >
              <option value="">Select a category</option>
              {PRODUCT_CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.productCategory && (
              <span className="field-error">{errors.productCategory}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="serialNumber">Model / serial number (optional)</label>
            <input
              id="serialNumber"
              type="text"
              placeholder="e.g. YLW-2024-XJ7"
              value={form.serialNumber}
              onChange={handleChange('serialNumber')}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="purchaseDate">Purchase date (optional)</label>
            <input
              id="purchaseDate"
              type="date"
              value={form.purchaseDate}
              onChange={handleChange('purchaseDate')}
            />
          </div>

          <div className="field">
            <label htmlFor="purchaseSource">Where purchased</label>
            <select
              id="purchaseSource"
              value={form.purchaseSource}
              onChange={handleChange('purchaseSource')}
              aria-invalid={Boolean(errors.purchaseSource)}
            >
              <option value="">Select an option</option>
              {PURCHASE_SOURCES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.purchaseSource && (
              <span className="field-error">{errors.purchaseSource}</span>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>How you use it</legend>

        <div className="field-row">
          <div className="field">
            <label htmlFor="useCase">Primary use case</label>
            <select
              id="useCase"
              value={form.useCase}
              onChange={handleChange('useCase')}
              aria-invalid={Boolean(errors.useCase)}
            >
              <option value="">Select an option</option>
              {USE_CASES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.useCase && <span className="field-error">{errors.useCase}</span>}
          </div>

          <div className="field">
            <label htmlFor="usageFrequency">Usage frequency</label>
            <select
              id="usageFrequency"
              value={form.usageFrequency}
              onChange={handleChange('usageFrequency')}
              aria-invalid={Boolean(errors.usageFrequency)}
            >
              <option value="">Select an option</option>
              {USAGE_FREQUENCIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.usageFrequency && (
              <span className="field-error">{errors.usageFrequency}</span>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="comments">Additional comments (optional)</label>
          <textarea
            id="comments"
            rows={4}
            placeholder="Anything else you'd like us to know?"
            value={form.comments}
            onChange={handleChange('comments')}
          />
        </div>
      </fieldset>

      <button type="submit" className="btn-primary">
        Register product
      </button>
    </form>
  )
}
