import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ page, pages, onChange }) {
  const { t } = useTranslation();
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 flex items-center gap-2 hover:bg-green-50"
      >
        <FaChevronLeft /> {t('common.previous')}
      </button>
      <span className="px-4 py-2 bg-green-800 text-white rounded-lg">
        {t('common.page')} {page} {t('common.of')} {pages}
      </span>
      <button
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 flex items-center gap-2 hover:bg-green-50"
      >
        {t('common.next')} <FaChevronRight />
      </button>
    </div>
  );
}