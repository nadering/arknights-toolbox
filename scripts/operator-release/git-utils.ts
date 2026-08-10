import { execFileSync } from "node:child_process";

/**
 * 특정 파일의 변경 commit을 오래된 순서부터 가져옵니다.
 *
 * release scanner에서는 "언제 새 charId가 처음 추가되었는지"가 중요하므로
 * 최신순이 아니라 오래된 순서부터 순회해야 합니다.
 */
export const getCommitHashesByFilePath = (
  repositoryPath: string,
  filePath: string,
) => {
  const output = execFileSync(
    "git",
    ["log", "--reverse", "--format=%H", "--", filePath],
    {
      cwd: repositoryPath,
    },
  ).toString();

  return output.trim().split("\n").filter(Boolean);
};

export const getCommitDate = (repositoryPath: string, commitHash: string) => {
  const output = execFileSync(
    "git",
    ["show", "-s", "--format=%cI", commitHash],
    {
      cwd: repositoryPath,
    },
  ).toString();

  return output.trim();
};

/**
 * 특정 commit 시점의 파일 내용을 읽습니다.
 *
 * 오래된 commit에는 파일이 아직 없을 수 있으므로 실패 시 null을 반환합니다.
 */
export const readFileAtCommit = (
  repositoryPath: string,
  commitHash: string,
  filePath: string,
) => {
  try {
    return execFileSync("git", ["show", `${commitHash}:${filePath}`], {
      cwd: repositoryPath,
      maxBuffer: 1024 * 1024 * 100,
    }).toString();
  } catch {
    return null;
  }
};

export const getShortCommitHash = (commitHash: string) => {
  return commitHash.slice(0, 8);
};
