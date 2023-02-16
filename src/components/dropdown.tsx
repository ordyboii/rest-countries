import "./dropdown.css";
import { Accessor, createSignal, onMount, Setter } from "solid-js";

const options = [
  { region: "Africa" },
  { region: "America" },
  { region: "Asia" },
  { region: "Europe" },
  { region: "Oceanic" }
];

type DropdownProps = {
  option: Accessor<string>;
  setOption: Setter<string>;
};

export default function Dropdown({ option, setOption }: DropdownProps) {
  let dropdownRef: HTMLDivElement | undefined;
  let buttonRef: HTMLButtonElement | undefined;
  let menuRef: HTMLDivElement | undefined;

  const [open, setOpen] = createSignal(false);
  const [index, setIndex] = createSignal(0);

  onMount(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
        setOpen(false);
        buttonRef?.focus();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  const handleKeyboard = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "ArrowUp") {
      index() > 0 ? setIndex(index() - 1) : setIndex(options.length);
    } else if (e.key === "ArrowDown") {
      index() < options.length - 1 ? setIndex(index() + 1) : setIndex(0);
    } else if (e.key === "Escape") {
      setOpen(false);
      buttonRef?.focus();
    }
  };

  return (
    <div ref={dropdownRef!} class='dropdown' onClick={e => e.stopPropagation()}>
      <button
        id='dropdown'
        aria-haspopup={true}
        aria-expanded={open() ? true : false}
        aria-controls='dropdown-menu'
        aria-label='Filter By Region'
        ref={buttonRef!}
        onClick={() => {
          setOpen(!open());
          menuRef?.focus();
        }}
      >
        {option() || "Filter By Region"}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          aria-hidden={true}
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          ></path>
        </svg>
      </button>

      {open() && (
        <div
          role='menu'
          tabIndex={0}
          id='dropdown-menu'
          aria-labelledby='dropdown'
          ref={menuRef!}
          onKeyDown={handleKeyboard}
        >
          {options.map(value => (
            <button
              role='menuitem'
              tabIndex={-1}
              onClick={() => setOption(value.region)}
              data-selected={options[index()] === value ? true : false}
            >
              {value.region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
