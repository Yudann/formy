import { ResultData } from '../types';

export const getSocialStats = (data: ResultData[]) => {
    const stats: Record<string, number> = {};
    data.forEach(r => {
        const platforms = r.social_media ? r.social_media.split(',') : [];
        platforms.forEach(p => {
            const cleanP = p.trim();
            if (cleanP) {
                stats[cleanP] = (stats[cleanP] || 0) + 1;
            }
        });
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
};

export const getDurationStats = (data: ResultData[]) => {
    const stats: Record<string, number> = {};
    data.forEach(r => {
        stats[r.duration] = (stats[r.duration] || 0) + 1;
    });
    return stats;
};

export const getMetricsAvg = (data: ResultData[]) => {
    const keys = [
        'unaware_time', 'hard_to_stop', 'distraction',
        'procrastination', 'scroll_while_study', 'addiction_feel', 'final_reflection'
    ];
    const labels: Record<string, string> = {
        unaware_time: 'Lupa Waktu',
        hard_to_stop: 'Susah Berhenti',
        distraction: 'Gangguan Fokus',
        procrastination: 'Nunda Tugas',
        scroll_while_study: 'Scroll Pas Belajar',
        addiction_feel: 'Rasa Kecanduan',
        final_reflection: 'Dampak Konsentrasi'
    };

    return keys.map(key => {
        const sum = data.reduce((acc, curr) => acc + (curr[key as keyof ResultData] as number), 0);
        return {
            label: labels[key],
            avg: data.length ? (sum / data.length).toFixed(1) : 0
        };
    });
};

export const calculateAvgScore = (resp: ResultData) => {
    const scores = [
        resp.unaware_time, resp.hard_to_stop, resp.distraction,
        resp.procrastination, resp.scroll_while_study, resp.addiction_feel, resp.final_reflection
    ];
    const sum = scores.reduce((a, b) => a + b, 0);
    return (sum / scores.length).toFixed(1);
};

export const getGlobalAvg = (data: ResultData[]) => {
    if (!data.length) return "0.0";
    const allMetrics = data.map(r => calculateAvgScore(r));
    const sum = allMetrics.reduce((a, b) => a + Number(b), 0);
    return (sum / allMetrics.length).toFixed(1);
};

export const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'instagram': return 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500';
        case 'tiktok': return 'bg-slate-900 dark:bg-slate-700';
        case 'twitter': return 'bg-sky-500';
        case 'youtube': return 'bg-red-600';
        default: return 'bg-indigo-500';
    }
};
