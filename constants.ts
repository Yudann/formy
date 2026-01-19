
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'name',
    question: 'Nama kamu siapa nih?',
    type: 'text',
    placeholder: 'Ketik nama kamu di sini...',
    required: true,
    validation: {
      pattern: '^[a-zA-Z\\s]+$',
      customError: 'Nama cuma boleh huruf ya!'
    }
  },
  {
    id: 'age',
    question: 'Sekarang umur kamu berapa?',
    type: 'number',
    placeholder: 'Contoh: 20',
    required: true,
    validation: {
      min: 16,
      max: 30
    }
  },
  {
    id: 'major',
    question: 'Kamu mahasiswa jurusan apa?',
    type: 'text',
    placeholder: 'Misal: Teknik Informatika',
    required: true,
  },
  {
    id: 'semester',
    question: 'Sekarang lagi semester berapa?',
    type: 'number',
    placeholder: 'Contoh: 4',
    required: true,
    validation: {
      min: 1,
      max: 14
    }
  },
  {
    id: 'social_media',
    question: 'Media sosial apa saja yang sering kamu buka? (Boleh pilih lebih dari satu)',
    type: 'choice',
    multiSelect: true,
    options: [
      { label: 'Instagram', value: 'instagram' },
      { label: 'TikTok', value: 'tiktok' },
      { label: 'Twitter / X', value: 'twitter' },
      { label: 'YouTube', value: 'youtube' },
      { label: 'Lainnya', value: 'other' },
    ],
    required: true,
  },
  {
    id: 'duration',
    question: 'Kalau sehari, kira-kira berapa lama kamu scroll media sosial?',
    type: 'choice',
    options: [
      { label: '< 1 Jam', value: 'under_1' },
      { label: '1 – 3 Jam', value: '1_to_3' },
      { label: '3 – 5 Jam', value: '3_to_5' },
      { label: '> 5 Jam', value: 'over_5' },
    ],
    required: true,
  },
  {
    id: 'unaware_time',
    question: 'Pernah nggak sih scroll terus sampai nggak sadar waktu?',
    type: 'scale',
    description: '1: Nggak Pernah, 5: Sering Banget',
    required: true,
  },
  {
    id: 'hard_to_stop',
    question: 'Kalau sudah scroll, susah berhenti nggak?',
    type: 'scale',
    description: '1: Gampang kok, 5: Susah banget',
    required: true,
  },
  {
    id: 'distraction',
    question: 'Menurut kamu, scrolling ini ganggu fokus belajar nggak?',
    type: 'scale',
    description: '1: Nggak sama sekali, 5: Ganggu banget',
    required: true,
  },
  {
    id: 'procrastination',
    question: 'Scrolling bikin kamu jadi nunda tugas nggak?',
    type: 'scale',
    description: '1: Nggak pernah, 5: Sering banget',
    required: true,
  },
  {
    id: 'scroll_while_study',
    question: 'Pernah scroll media sosial pas lagi belajar?',
    type: 'scale',
    description: '1: Nggak pernah, 5: Sering banget',
    required: true,
  },
  {
    id: 'addiction_feel',
    question: 'Kalau jujur, kamu ngerasa kecanduan scroll nggak?',
    type: 'scale',
    description: '1: Nggak sama sekali, 5: Iya banget',
    required: true,
  },
  {
    id: 'final_reflection',
    question: 'Setelah dipikir-pikir, menurut kamu scrolling ini berdampak ke konsentrasi belajar nggak?',
    type: 'scale',
    description: '1: Nggak ada dampak, 5: Dampak besar',
    required: true,
  },
];
