import { useState } from 'react'
import AutocompleteSelect from './AutocompleteSelect.jsx'
import './ProductRegistrationForm.css'

const PRODUCT_CATEGORIES = [
  'Electronics',
  'Home Appliance',
  'Wearable',
  'Other',
]

const PURCHASE_SOURCES = ['Online', 'Retail Store', 'Reseller', 'Other']

const INITIAL_FORM = {
  ownerName: '',
  email: '',
  productName: '',
  productCategory: '',
  purchaseSource: '',
  purchaseDate: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PURCHASE_DATE_PATTERN = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/

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
  if (form.purchaseDate.trim() && !PURCHASE_DATE_PATTERN.test(form.purchaseDate.trim())) {
    errors.purchaseDate = 'Please use MM/DD/YYYY format.'
  }

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

  function handleSelectChange(field) {
    return (value) => {
      setForm((prev) => ({ ...prev, [field]: value }))
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
          <AutocompleteSelect
            id="productCategory"
            label="Product category"
            placeholder="Select a category"
            options={PRODUCT_CATEGORIES}
            value={form.productCategory}
            onChange={handleSelectChange('productCategory')}
            error={errors.productCategory}
          />

          <AutocompleteSelect
            id="purchaseSource"
            label="Where purchased"
            placeholder="Select an option"
            options={PURCHASE_SOURCES}
            value={form.purchaseSource}
            onChange={handleSelectChange('purchaseSource')}
            error={errors.purchaseSource}
          />
        </div>

        <div className="field">
          <label htmlFor="purchaseDate">Purchase date (optional)</label>
          <input
            id="purchaseDate"
            type="text"
            placeholder="MM/DD/YYYY"
            value={form.purchaseDate}
            onChange={handleChange('purchaseDate')}
            aria-invalid={Boolean(errors.purchaseDate)}
          />
          {errors.purchaseDate && <span className="field-error">{errors.purchaseDate}</span>}
        </div>
      </fieldset>

      <button id="registerSubmit" type="submit" className="btn-primary">
        Register product
      </button>
    </form>
  )
}
