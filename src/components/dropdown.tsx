import "./dropdown.css";
import { type StateUpdater, useState } from "preact/hooks";

type OptionProps = {
  value?: string;
  activeIndex: number;
  setOption: StateUpdater<string>;
};

const Option = ({ value, setOption, activeIndex }: OptionProps) => {
  return (
    <li
      role='menuitem'
      tabIndex={-1}
      class={options[activeIndex]?.region === value ? "is-selected" : ""}
      onClick={() => setOption(value!)}
    >
      {value}
    </li>
  );
};

const options = [
  { region: "Africa" },
  { region: "America" },
  { region: "Asia" },
  { region: "Europe" },
  { region: "Oceanic" }
];

type DropdownProps = {
  option: string;
  setOption: StateUpdater<string>;
};

export default function Dropdown({ option, setOption }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div class='dropdown'>
      <button
        id='dropdown'
        aria-haspopup={true}
        aria-expanded={open ? true : false}
        aria-controls='dropdown-menu'
        aria-label='Filter By Region'
        onClick={() => setOpen(!open)}
      >
        {option || "Filter By Region"}
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

      {open && (
        <ul
          ref={e => e?.focus()}
          id='dropdown-menu'
          role='menu'
          tabIndex={0}
          aria-labelledby='dropdown'
          onKeyDown={e => {
            e.preventDefault();
            if (e.key === "ArrowUp" && index >= 0) {
              setIndex(index - 1);
              setOption(options[index]!.region);
            } else if (e.key === "ArrowDown" && index <= options.length) {
              setIndex(index + 1);
              setOption(options[index]!.region);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        >
          {options.map(value => (
            <Option
              activeIndex={index}
              value={value.region}
              setOption={setOption}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
