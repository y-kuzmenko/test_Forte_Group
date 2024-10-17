const SearchInput = ({ value, placeholder, onChange }) => (
    <>
        <input type="text" value={value} placeholder={placeholder} onChange={onChange} />
    </>
);

export default SearchInput;