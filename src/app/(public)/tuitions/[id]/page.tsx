import TuitionDetails from '@/components/tuition/TuitionDetails';
import { getSingleTuition } from '@/qurey/tuitions.api';
import { ITuition } from '@/types/tuition';

const TuitionsDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    console.log(id);
    const tuition = await getSingleTuition(id as string);
    const res: ITuition = tuition.data;
    return (
        <div>
            <TuitionDetails tuition={res} userRole={'Student'} />
        </div>
    );
};

export default TuitionsDetailsPage;
