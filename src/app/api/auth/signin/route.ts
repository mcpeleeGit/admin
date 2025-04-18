import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface SignInRequestBody {
  email: string;
  password: string;
}

interface SignInResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
  token?: string;
  message?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<SignInResponse>> {
  try {
    const body = await request.json() as SignInRequestBody;
    const { email, password } = body;

    // TODO: 실제 인증 로직 구현
    // 예시 검증 (실제 구현에서는 DB 조회 및 비밀번호 해시 비교가 필요)
    if (email === 'admin@googsu.com' && password === 'admin@123') {
      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          email,
          name: 'Admin User',
          avatar: '/assets/avatar.png'
        },
        token: 'sample_jwt_token' // TODO: 실제 JWT 토큰 생성 필요
      });
    }

    return NextResponse.json(
      { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 