import TuitionDetails from '@/components/tuition/TuitionDetails';
import { getSingleTuition } from '@/qurey/tuitions.api';
import { ITuition } from '@/types/tuition';

const TuitionsDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const tuition = await getSingleTuition(id as string);
    const res: ITuition = tuition.data;

    const server_url: string | undefined = process.env.BACKEND_BASE_URL;

    return (
        <div>
            <TuitionDetails tuition={res} server_url={server_url} />
        </div>
    );
};

export default TuitionsDetailsPage;
