import { useEffect, useRef, useState } from 'react'

export default function AutocompleteSelect({ id, label, options, value, onChange, placeholder, error }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(null)
  const [highlighted, setHighlighted] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
        setQuery(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = query
    ? options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))
    : options

  function openList() {
    setOpen(true)
    setHighlighted(0)
  }

  function handleSelect(option) {
    onChange(option)
    setQuery(null)
    setOpen(false)
  }

  function handleInputChange(event) {
    setQuery(event.target.value)
    setOpen(true)
    setHighlighted(0)
  }

  function handleKeyDown(event) {
    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'Enter') {
        event.preventDefault()
        openList()
      }
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlighted((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (filtered[highlighted]) handleSelect(filtered[highlighted])
    } else if (event.key === 'Escape') {
      setOpen(false)
      setQuery(null)
    }
  }

  const displayValue = query !== null ? query : value

  return (
    <div className="field autocomplete" ref={containerRef}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleInputChange}
        onFocus={openList}
        onClick={openList}
        onKeyDown={handleKeyDown}
        aria-invalid={Boolean(error)}
      />
      {open && (
        <ul className="autocomplete-list" id={`${id}-listbox`} role="listbox">
          {filtered.length === 0 && <li className="autocomplete-empty">No matches</li>}
          {filtered.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={option === value}
              className={
                'autocomplete-option' +
                (index === highlighted ? ' autocomplete-option-highlighted' : '') +
                (option === value ? ' autocomplete-option-selected' : '')
              }
              onMouseDown={(event) => {
                event.preventDefault()
                handleSelect(option)
              }}
              onMouseEnter={() => setHighlighted(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}
