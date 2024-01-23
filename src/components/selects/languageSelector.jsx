import { PropTypes } from 'prop-types';
function LanguageSelector({ languages, setLanguageSelected }) {
  const selectLanguage = (language) => {
    setLanguageSelected(language)
  }

  return (<main className="mt-4">
    <div className="space-y-4">
      {languages?.map((language) => (
        <div key={language.locale} className="isolate inline-flex rounded-md shadow-sm">
          <button
          onClick={() => selectLanguage(language.locale)}
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            {language.label}
          </button>

        </div>
      ))}
    </div>
  </main>)


}
LanguageSelector.propTypes = {
  languages: PropTypes.array,
  setLanguageSelected: PropTypes.func
};
export default LanguageSelector