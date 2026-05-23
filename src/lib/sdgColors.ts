export function sdgChipClass(sdg: string): string {
  const map: Record<string, string> = {
    'No poverty':                                    'bg-red-50    text-red-700    border border-red-200',
    'Zero hunger':                                   'bg-amber-50  text-amber-700  border border-amber-200',
    'Good health':                                   'bg-green-50  text-green-700  border border-green-200',
    'Quality education':                             'bg-blue-50   text-blue-700   border border-blue-200',
    'Gender equality':                               'bg-orange-50 text-orange-700 border border-orange-200',
    'Clean water and sanitation':                    'bg-sky-50    text-sky-700    border border-sky-200',
    'Affordable and clean energy':                   'bg-yellow-50 text-yellow-700 border border-yellow-200',
    'Decent work and economic growth':               'bg-purple-50 text-purple-700 border border-purple-200',
    'Industry, innovation, and infrastructure':      'bg-slate-50  text-slate-700  border border-slate-200',
    'Reduced inequalities':                          'bg-pink-50   text-pink-700   border border-pink-200',
    'Sustainable cities and communities':            'bg-teal-50   text-teal-700   border border-teal-200',
    'Responsible consumption and production':        'bg-lime-50   text-lime-700   border border-lime-200',
    'Climate action':                                'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'Life below water':                              'bg-cyan-50   text-cyan-700   border border-cyan-200',
    'Life on land':                                  'bg-green-50  text-green-800  border border-green-300',
    'Peace, justice and strong institutions':        'bg-indigo-50 text-indigo-700 border border-indigo-200',
    'Partnerships for the goals':                    'bg-gray-50   text-gray-700   border border-gray-200',
  };
  const key = Object.keys(map).find((k) => k.toLowerCase() === sdg.toLowerCase());
  return key ? map[key] : 'bg-stone-50 text-stone-600 border border-stone-200';
}
