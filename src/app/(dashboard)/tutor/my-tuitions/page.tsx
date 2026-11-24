import TutorTuitionsManager from '@/components/dashboard/TutorTuitionsManager';

const MyTuitions = () => {
    const server_url: string | undefined = process.env.BACKEND_BASE_URL;
    return <TutorTuitionsManager server_url={server_url} />;
};

export default MyTuitions;
