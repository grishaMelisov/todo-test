'use client';

import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  size?: number;
}

export default function CustomCheckbox({
  checked,
  onChange,
  size = 24,
}: CustomCheckboxProps) {
  return (
    <button
      onClick={onChange}
      className="text-soft-grey flex h-6 w-6 items-center justify-center transition"
      type="button"
    >
      {checked ? (
        <IoMdCheckboxOutline size={size} />
      ) : (
        <MdCheckBoxOutlineBlank size={size} />
      )}
    </button>
  );
}
