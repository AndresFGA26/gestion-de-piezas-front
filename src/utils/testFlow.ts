// Utilidad de testing para verificar el flujo CRUD de piezas
import { fetchPieces, createPiece } from '../features/pieces/api';

export interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export const testPiecesFlow = async (blockId: string): Promise<TestResult[]> => {
  const results: TestResult[] = [];

  // Test 1: Fetch pieces (should return empty array initially)
  try {
    const pieces = await fetchPieces(blockId);
    results.push({
      success: true,
      message: `✓ Fetch pieces successful: ${pieces.length} pieces found`,
      data: pieces
    });
  } catch (error) {
    results.push({
      success: false,
      message: '✗ Failed to fetch pieces',
      error
    });
  }

  // Test 2: Create piece without peso_real (should work now)
  try {
    const newPiece = await createPiece(blockId, {
      peso_teorico: 15.5
      // peso_real omitido para probar nullable
    });
    results.push({
      success: true,
      message: '✓ Create piece without peso_real successful',
      data: newPiece
    });
  } catch (error) {
    results.push({
      success: false,
      message: '✗ Failed to create piece without peso_real',
      error
    });
  }

  // Test 3: Create piece with peso_real
  try {
    const pieceWithWeight = await createPiece(blockId, {
      peso_teorico: 20.0,
      peso_real: 21.5
    });
    results.push({
      success: true,
      message: '✓ Create piece with peso_real successful',
      data: pieceWithWeight
    });
  } catch (error) {
    results.push({
      success: false,
      message: '✗ Failed to create piece with peso_real',
      error
    });
  }

  // Test 4: Fetch pieces again (should show newly created pieces)
  try {
    const pieces = await fetchPieces(blockId);
    results.push({
      success: true,
      message: `✓ Fetch pieces after creation: ${pieces.length} pieces found`,
      data: pieces
    });

    // Validate structure
    const hasValidStructure = pieces.every(piece => 
      piece.id && 
      typeof piece.peso_teorico === 'number' &&
      (piece.peso_real === null || typeof piece.peso_real === 'number')
    );

    if (!hasValidStructure) {
      results.push({
        success: false,
        message: '✗ Some pieces have invalid structure',
        data: pieces
      });
    }
  } catch (error) {
    results.push({
      success: false,
      message: '✗ Failed to fetch pieces after creation',
      error
    });
  }

  return results;
};

// Run test in browser console
export const runTest = async () => {
  console.log('🧪 Starting Pieces CRUD Flow Test...');
  
  // Get blockId from current URL or use a test value
  const urlParams = new URLSearchParams(window.location.search);
  const testBlockId = urlParams.get('blockId') || '1';
  
  try {
    const results = await testPiecesFlow(testBlockId);
    
    console.log('\n📊 Test Results:');
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.message}`);
      if (result.error) {
        console.error('   Error:', result.error);
      }
    });

    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;
    
    console.log(`\n🎯 Summary: ${successCount}/${totalCount} tests passed`);
    
    if (successCount === totalCount) {
      console.log('🎉 All tests passed! The pieces flow is working correctly.');
    } else {
      console.log('⚠️ Some tests failed. Check the errors above.');
    }
    
    return results;
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    return [];
  }
};

// Make it available globally for easy testing
if (typeof window !== 'undefined') {
  (window as any).testPiecesFlow = runTest;
}
