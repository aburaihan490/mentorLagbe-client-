import getTuitions from '@/qurey/tuitions.api';
import TuitionCard from './TuitionCard';
import Pagination from './Pagination';

interface Props {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const TuitionList = async ({ searchParams }: Props) => {
    const { search, subject, class: classLevel, mode, page } = searchParams;

    const getValue = (value: string | string[] | undefined) =>
        Array.isArray(value) ? value[0] : value;

    const pageNumber = Math.max(1, Number(getValue(page)) || 1);

    const result = await getTuitions({
        search: getValue(search),
        subject: getValue(subject),
        class: getValue(classLevel),
        mode: getValue(mode),
        page: pageNumber,
    });

    const { data: tuitions, pagination } = result;

    return (
        <>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {tuitions.map((tuition) => (
                    <TuitionCard key={tuition._id} tuition={tuition} />
                ))}
            </div>
            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
            />
        </>
    );
};

export default TuitionList;
