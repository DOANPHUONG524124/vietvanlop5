import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAverageScore,
  calculateSeedsEarned,
  getNestTier,
  analyzeText,
  NEST_TIERS
} from './rules.ts';

test('getNestTier maps seed counts to correct nest level', () => {
  const level1 = getNestTier(0);
  assert.equal(level1.level, 1);
  assert.equal(level1.name, 'Tổ Rơm Non Xanh');

  const level2 = getNestTier(45);
  assert.equal(level2.level, 2);
  assert.equal(level2.name, 'Tổ Cành Khô Ấm Áp');

  const level3 = getNestTier(100);
  assert.equal(level3.level, 3);
  assert.equal(level3.name, 'Nhà Cây Gỗ Mộc');

  const level4 = getNestTier(200);
  assert.equal(level4.level, 4);
  assert.equal(level4.name, 'Thư Viện Cổ Thụ Xanh');

  const level5 = getNestTier(350);
  assert.equal(level5.level, 5);
  assert.equal(level5.name, 'Lâu Đài Tri Thức Rừng Già');
});

test('calculateAverageScore computes 1-decimal average correctly', () => {
  const scores = {
    bo_cuc: 8,
    von_tu: 9,
    ngu_phap: 7.5,
    cam_xuc: 8.5,
    sang_tao: 9
  };
  const avg = calculateAverageScore(scores);
  assert.equal(avg, 8.4);
});

test('calculateSeedsEarned gives tiered rewards and penalizes plagiarism', () => {
  const highScores = { bo_cuc: 9, von_tu: 9, ngu_phap: 9, cam_xuc: 9, sang_tao: 9 };
  assert.equal(calculateSeedsEarned(highScores, false), 15);

  const goodScores = { bo_cuc: 8, von_tu: 8, ngu_phap: 8, cam_xuc: 8, sang_tao: 8 };
  assert.equal(calculateSeedsEarned(goodScores, false), 12);

  // When plagiarized, small encouraging token is returned
  assert.equal(calculateSeedsEarned(highScores, true), 2);
});

test('analyzeText identifies Grade 5 features (tu lay, compound pairs, comparison)', () => {
  const sample = `Sáng sớm, ông mặt trời từ từ thức giấc.
Những giọt sương long lanh đọng trên kẽ lá xanh biếc.
Mặc dù trời còn se lạnh nhưng các bạn học sinh đã hối hả đến trường.
Cây phượng vĩ đứng sừng sững như một chiếc ô khổng lồ màu xanh ngắt.`;

  const analysis = analyzeText(sample);
  assert.ok(analysis.wordCount > 30);
  assert.equal(analysis.paragraphCount, 4);
  assert.ok(analysis.detectedTuLay.includes('long lanh'));
  assert.ok(analysis.detectedTuLay.includes('xanh biếc'));
  assert.ok(analysis.detectedTuLay.includes('hối hả'));
  assert.ok(analysis.detectedCompoundPairs.some(p => p.includes('mặc dù... nhưng')));
  assert.ok(analysis.comparisonCount >= 1);
  assert.ok(analysis.personificationCount >= 1);
  assert.equal(analysis.plagiarismRisk.isPlagiarized, false);
});

test('analyzeText flags internet boilerplate patterns', () => {
  const boilerplate = `Trong tất cả các loài cây em thích nhất là cây bàng. Mặt trời như một quả cầu lửa khổng lồ từ từ nhô lên.`;
  const analysis = analyzeText(boilerplate);
  assert.equal(analysis.plagiarismRisk.isPlagiarized, true);
  assert.ok(analysis.plagiarismRisk.riskScore >= 70);
});
