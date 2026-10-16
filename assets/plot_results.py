"""Editable charts of explicitly paper-reported numbers (not raw measurements).
Run: python plot_results.py. Requires matplotlib. No PDF screenshots embedded.
"""
from pathlib import Path
import json
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
root=Path(__file__).resolve().parent
r=json.loads((root/'paper_results.json').read_text())
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'svg.fonttype':'none','pdf.fonttype':42,'axes.spines.top':False,'axes.spines.right':False,'axes.spines.left':False,'axes.labelcolor':'#354558','xtick.color':'#5e6b78','ytick.color':'#354558'})
def save(fig,name):
 for ext in ['svg','pdf']:
  fig.savefig(root/(name+'.'+ext),bbox_inches='tight',facecolor='white',metadata={'Creator':'KnowinRouter Authors'})
 plt.close(fig)
a=r['ablation'];fig,ax=plt.subplots(figsize=(8.4,4.5),layout='constrained')
names=['Full system']+a['variants'];scores=[a['full']]+a['scores']
colors=['#167e86']+['#a36571']*2+['#95b9b4']*3+['#a8adc8']*3
bars=ax.barh(names[::-1],scores[::-1],color=colors[::-1],height=.62)
ax.set_xlim(0,66);ax.set_xlabel('EQA average · separate frozen protocol')
ax.bar_label(bars,fmt='%.1f',padding=5,color='#243747',fontsize=11)
ax.grid(axis='x',color='#e9eef0');ax.set_axisbelow(True);ax.tick_params(axis='y',length=0)
ax.set_title('What contributes to the reported result?',loc='left',fontweight='bold',pad=16)
save(fig,'ablation')
a=r['matched_general_delta'];fig,ax=plt.subplots(figsize=(8.4,3.3),layout='constrained')
bars=ax.bar(a['benchmarks'],a['deltas'],color=['#a36571' if v<0 else '#167e86' for v in a['deltas']],width=.55)
ax.axhline(0,color='#7c8a96',lw=.8);ax.set_ylim(-4.8,9.3);ax.bar_label(bars,labels=[f'{v:+.2f}' for v in a['deltas']],padding=5)
ax.set_ylabel('Score difference');ax.set_title('Compared with the same General expert',loc='left',fontweight='bold',pad=15)
ax.grid(axis='y',color='#e9eef0');ax.set_axisbelow(True)
save(fig,'matched-tradeoffs')
