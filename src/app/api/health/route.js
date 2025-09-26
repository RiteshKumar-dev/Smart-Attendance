export async function GET() {
  try {
    return new Response(
      JSON.stringify({
        success: true,
        status: 'healthy',
        service: 'API',
        message: 'Server is up and running',
        timestamp: new Date().toISOString(),
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        status: 'unhealthy',
        service: 'API',
        message: 'Server error',
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
      { status: 500 }
    );
  }
}
