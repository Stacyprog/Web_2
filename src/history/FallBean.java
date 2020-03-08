/*package history;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class FallBean implements Serializable {

    private static final String FILENAME = "TTTTTRRRRK.UIV";


    public boolean isStandUp() throws IOException {
        File file = new File(FILENAME);

        if (!file.isFile()) {
            return false;
        }

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            return br.readLine().hashCode() != HASH;
        }
    }
}
*/