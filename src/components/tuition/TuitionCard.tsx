import { ITuition } from '@/types/tuition';
import Image from 'next/image';
import Link from 'next/link';

interface TuitionCardProps {
    tuition: ITuition;
}

const TuitionCard = ({ tuition }: TuitionCardProps) => {
    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5">
            {/* Banner Image */}
            <div className="relative h-48 overflow-hidden bg-emerald-50">
                <Image
                    src={tuition.bannerImage}
                    alt={tuition.title}
                    width={800}
                    height={800}
                    loading="eager"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${
                        tuition.mode === 'Online'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'
                    }`}
                >
                    {tuition.mode}
                </span>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Subject and Class */}
                <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {tuition.subject}
                    </span>

                    <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {tuition.classLevel}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mb-3 line-clamp-2 min-h-14 text-lg font-bold text-slate-900 transition group-hover:text-emerald-600">
                    {tuition.title}
                </h3>

                {/* Location */}
                <p className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                    <span>📍</span>
                    {tuition.location}
                </p>

                {/* Tutor Information */}
                <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-100/70 bg-[#f5f8ff] p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                        {tuition.tutorName.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs text-slate-500">
                            Posted by Tutor
                        </p>

                        <p className="truncate text-sm font-semibold text-slate-800">
                            {tuition.tutorName}
                        </p>
                    </div>
                </div>

                {/* Fee and Days */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                        <p className="text-xs text-slate-500">Monthly Fee</p>

                        <p className="text-xl font-extrabold text-emerald-600">
                            ৳{tuition.monthlyFee.toLocaleString('en-BD')}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-slate-500">Schedule</p>

                        <p className="text-sm font-semibold text-slate-800">
                            {tuition.daysPerWeek} Days / Week
                        </p>
                    </div>
                </div>

                {/* Details Button */}
                <Link
                    href={`/tuitions/${tuition._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                    View Details
                    <span>→</span>
                </Link>
            </div>
        </div>
    );
};

export default TuitionCard;
