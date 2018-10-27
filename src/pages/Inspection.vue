<template>
  <div>
    <!--action="http://localhost:8085/examinations" method="post" enctype="multipart/form-data"-->
    <form >
      examinationDate: <input type="text" name="examinationDate"/><br />
      carId: <input type="text" name="carId"/><br />
      description: <input type="text" name="description"/><br />
      zdjecia: <input ref="multipartfiles" type="file" name="multipartfiles" multiple/><br />
      <button type="button" @click="a">button</button>
    </form>
    <hr />
    <form action="http://localhost:8085/examinations" method="post" enctype="multipart/form-data">
      examinationDate: <input type="text" name="examinationDate"/><br />
      carId: <input type="number" name="carId"/><br />
      description: <input type="text" name="description"/><br />
      zdjecia: <input type="file" name="multipartfiles" multiple/><br />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // dto: {
      //   examinationDate: 'examination',
      //   carId: 5,
      //   description: 'desc',
      // },
    };
  },
  methods: {
    a() {
      let i;
      const multipartfiles = this.$refs.multipartfiles.files;
      const formData = new FormData();
      formData.append('dto', 'aaa');
      formData.append('carId', 4);
      formData.append('examinationDate', '2018-10-28');
      const len = multipartfiles.length;
      for (i = 0; i < len; i++) {
        formData.append('multipartfiles', multipartfiles[i]);
      }

      this.$http.post('http://localhost:9092/api/examination/examinations', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          console.log('SUCCESS!!');
        })
        .catch(() => {
          console.log('FAILURE!!');
        });
    },
  },
};
</script>
