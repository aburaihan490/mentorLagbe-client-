import getTuitions from '@/qurey/tuitions.api';
import TuitionCard from './TuitionCard';

const TuitionList = async () => {
    const tuitions = await getTuitions();

    return (
        <>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {tuitions.map((tuition) => (
                    <TuitionCard key={tuition._id} tuition={tuition} />
                ))}
            </div>
        </>
    );
};

export default TuitionList;
