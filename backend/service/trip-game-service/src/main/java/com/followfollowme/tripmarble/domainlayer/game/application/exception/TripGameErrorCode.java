package com.followfollowme.tripmarble.domainlayer.game.application.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TripGameErrorCode {

    GAME_NOT_FOUND("TRIP_GAME_001", "해당 게임 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    HOST_MEMBER_NOT_FOUND("TRIP_GAME_002", "해당 게임에서 방장 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    NOT_HOST_MEMBER("TRIP_GAME_003", "게임 시작/강제 종료 권한이 없습니다. 방장만 게임을 시작/강제 종료 할 수 있습니다.", HttpStatus.FORBIDDEN),
    MEMBER_NOT_READY("TRIP_GAME_004", "모든 플레이어가 준비되어야 게임을 시작할 수 있습니다.", HttpStatus.BAD_REQUEST),
    MEMBER_PROFILE_FETCH_FAILED("TRIP_GAME_005", "회원 프로필 정보를 가져오는데 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    MEMBER_NOT_FOUND("TRIP_GAME_006", "해당 게임에 참여한 회원이 존재하지 않습니다.", HttpStatus.NOT_FOUND),
    MEMBER_TURN_NOT_MATCH("TRIP_GAME_007", "현재 플레이어의 턴이 아닙니다.", HttpStatus.FORBIDDEN),
    TILE_NOT_FOUND("TRIP_GAME_008", "해당 위치의 타일을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    MEMBER_NOT_PARTICIPANT("TRIP_GAME_009", "해당 게임에 참여하지 않은 회원입니다.", HttpStatus.FORBIDDEN),
    GAME_NOT_WAITING("TRIP_GAME_010", "게임은 대기 상태에서만 시작할 수 있습니다.", HttpStatus.BAD_REQUEST),
    GAME_NOT_ONGOING("TRIP_GAME_011", "게임은 진행 중일 때만 주사위를 굴릴 수 있습니다.", HttpStatus.BAD_REQUEST),
    GAME_ALREADY_ENDED("TRIP_GAME_012", "이미 종료된 게임입니다.", HttpStatus.BAD_REQUEST);


    private final String code;
    private final String errorMessage;
    private final HttpStatus httpStatus;
}
