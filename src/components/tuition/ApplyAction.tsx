import React, { useState } from 'react';
import ApplyTuitionModal from './ApplyTuitionModal';
import { ITuition } from '@/types/tuition';

interface Props {
    canApply: boolean;
    tuition: ITuition;
}

const ApplyAction = ({ canApply, tuition }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="mt-8">
                {canApply ? (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        // disabled={
                        //     !tuition.isActive ||
                        //     tuition.approvalStatus !== 'approved'
                        // }
                        className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
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
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tuitionId={tuition._id}
                tuitionTitle={tuition.title}
            />
        </>
    );
};

export default ApplyAction;
