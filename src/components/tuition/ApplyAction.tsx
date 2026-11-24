import { useState } from 'react';
import ApplyTuitionModal from './ApplyTuitionModal';
import { ITuition } from '@/types/tuition';
import { authClient } from '@/lib/auth-client';

interface Props {
    server_url: string | undefined;
    tuition: ITuition;
}

const ApplyAction = ({ tuition, server_url }: Props) => {
    const { data: session } = authClient.useSession();
    const canApply = session?.user?.role?.toLocaleLowerCase() === 'student';

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="mt-8">
                {canApply ? (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={
                            !tuition.isActive ||
                            tuition.approvalStatus !== 'approved'
                        }
                        className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer"
                    >
                        Apply for Tuition
                    </button>
                ) : (
                    <div className="rounded-xl bg-yellow-50 p-4 text-center text-sm font-medium text-yellow-700">
                        Only students can apply for this tuition.
                    </div>
                )}
            </div>
            {/* Application Modal */}
            <ApplyTuitionModal
                server_url={server_url}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tuitionId={tuition._id}
                tuitionTitle={tuition.title}
                tutorEmail={tuition.tutorEmail}
            />
        </>
    );
};

export default ApplyAction;
